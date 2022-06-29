import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post, UploadedFile, UseGuards, UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { diskStorage } from 'multer';
import {ItemDto} from "./dto/item.dto";
import {ItemService} from "./item.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ItemModel} from "./item.model";
import {ACCESS_RIGHTS_ERROR, ITEM_HAS_ALREADY_BEEN_ADDED_ERROR, ITEM_NOT_FOUND_ERROR} from "../constants";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {IsAdmin} from "../decorators/admin.decorator";
import {CurrentUser} from "../decorators/current-user.decorator";
import {UserService} from "../user/user.service";
import {PurchaseService} from "../purchase/purchase.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../utils/file-upload.utils";

@ApiTags('Item')
@Controller('item')
export class ItemController {

    constructor(private itemService: ItemService) {
    }

    @ApiOperation({summary: "List of user items"})
    @ApiResponse({status: 200, type: [ItemModel]})
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get('my')
    async getUserItemList(@CurrentUser() user){
        const items = await this.itemService.getUserItems(user.id);
        if(!items){
            throw new NotFoundException(ITEM_NOT_FOUND_ERROR);
        }
        return items;
    }

    @ApiOperation({summary: "Getting a list of items"})
    @ApiResponse({status: 200, type: [ItemModel]})
    @HttpCode(200)
    @Get('list')
    async list() {
        const items = await this.itemService.findAllItems();
        if (!items) {
            throw new NotFoundException(ITEM_NOT_FOUND_ERROR);
        }
        return items;
    }



    @ApiOperation({summary: "Getting an item"})
    @ApiResponse({status: 200, type: ItemModel})
    @HttpCode(200)
    @Get(':itemId')
    async get(@Param('itemId') itemId: number) {
        const item = await this.itemService.findItemById(itemId);
        if (!item) {
            throw new NotFoundException(ITEM_NOT_FOUND_ERROR);
        }
        return item;
    }


    @ApiOperation({summary: "Adding an item"})
    @ApiResponse({status: 201, type: ItemModel})
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    @HttpCode(201)
    @Post('create')
    async create(@Body() dto: ItemDto, @UploadedFile() file, @IsAdmin() isAdmin: boolean) {
        if(!isAdmin){
            throw new BadRequestException(ACCESS_RIGHTS_ERROR);
        }
        const item = await this.itemService.findItemByName(dto.name);
        const responses = {
            originalname: file.originalname,
            filename: file.filename,
        }
        if (item){
            throw new BadRequestException(ITEM_HAS_ALREADY_BEEN_ADDED_ERROR);
        }
        const result = await this.itemService.createItem(dto, responses.filename);
        return result;
    }


    @ApiOperation({summary: "Updating an item"})
    @ApiResponse({status: 200, type: ItemModel})
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Patch('edit/:itemId')
    async edit(@Param('itemId') itemId: number, @IsAdmin() isAdmin: boolean, @Body() dto: ItemDto,) {
        if(!isAdmin){
            throw new BadRequestException(ACCESS_RIGHTS_ERROR);
        }
        const item = await this.itemService.findItemById(itemId);
        if (!item) {
            throw new NotFoundException(ITEM_NOT_FOUND_ERROR);
        }
        const result = await this.itemService.editItem(itemId, dto);
        return result;
    }


    @ApiOperation({summary: "List of items for admin"})
    @ApiResponse({status: 200, type: [ItemModel]})
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get('admin/list')
    async allItemsAdmin(@IsAdmin() isAdmin: boolean){
        if(!isAdmin){
            throw new BadRequestException(ACCESS_RIGHTS_ERROR);
        }
        const items = await this.itemService.findAllItems();
        if (!items) {
            throw new NotFoundException(ITEM_NOT_FOUND_ERROR);
        }
        return items;
    }
}
