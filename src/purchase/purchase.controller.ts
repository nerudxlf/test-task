import {
    BadRequestException,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    UseGuards
} from '@nestjs/common';
import {PurchaseService} from "./purchase.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {ItemService} from "../item/item.service";
import {ITEM_NOT_FOUND_ERROR, NOT_MONEY_ERROR, PAYING_ERROR} from "../constants";
import {CurrentUser} from "../decorators/current-user.decorator";
import {UserService} from "../user/user.service";
import {PurchaseModel} from "./purchase.model";

@ApiTags('Purchase')
@Controller('purchase')
export class PurchaseController {
    constructor(
        private itemService: ItemService,
        private purchaseService: PurchaseService,
        private userService: UserService,
    ) {
    }

    @ApiOperation({summary: "Making a purchase"})
    @ApiResponse({status: 201, type: PurchaseModel})
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Post('buy/:itemId')
    async buy(@Param('itemId') itemId: number, @CurrentUser() user) {
        const item = await this.itemService.findItemById(itemId);
        const currentUser = await this.userService.findOneById(user.id);
        if (!item) {
            throw new NotFoundException(ITEM_NOT_FOUND_ERROR);
        }
        const price = parseFloat(item.price);
        const currentBalance = parseFloat(currentUser.balance);
        if (price > currentBalance) {
            throw new BadRequestException(NOT_MONEY_ERROR);
        }
        let minus_balance = currentBalance - price;
        if (minus_balance < 0) {
            minus_balance = 0;
        }
        const money = minus_balance.toString();
        const resultUpdateBalance = await this.userService.balanceUpdate(currentUser.id, money)
        if(!resultUpdateBalance){
            await this.userService.balanceUpdate(currentUser.id, currentBalance.toString())
            throw new BadRequestException(PAYING_ERROR);
        }
        const result = await this.purchaseService.buyItem(item, user.id);
        if(!result){
            await this.userService.balanceUpdate(currentUser.id, currentBalance.toString())
            throw new BadRequestException(PAYING_ERROR);
        }
        return result;
    }

    @ApiOperation({summary: "Getting the history of operations"})
    @ApiResponse({status: 200, type: [PurchaseModel]})
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get('/history')
    async history(@CurrentUser() user) {
        const history = await this.purchaseService.getUserHistory(user.id);
        return history;
    }

}
