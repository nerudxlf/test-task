import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    UseGuards
} from '@nestjs/common';
import {UserService} from "./user.service";
import {REPLENISHMENT_ERROR, USER_NOT_FOUND_ERROR} from "../constants";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserModel} from "./user.model";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CurrentUser} from "../decorators/current-user.decorator";


@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @ApiOperation({summary: "Getting a user"})
    @ApiResponse({status: 200, type: UserModel})
    @HttpCode(200)
    @Get(':userId')
    async get(@Param('userId') userId: number) {
        const user = await this.userService.findOneById(userId)
        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND_ERROR);
        }
        return user;
    }

    @ApiOperation({summary: "User balance update"})
    @ApiResponse({status: 200, type: UserModel})
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Patch('')
    async updateBalance(@CurrentUser() currentUser, @Body('money') money: string) {
        const user = await this.userService.findOneById(currentUser.id)
        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND_ERROR);
        }
        if (parseFloat(money) <= 0){
            throw new BadRequestException(REPLENISHMENT_ERROR);
        }
        const result = await this.userService.balanceUpdate(user.id, money);
        return result;
    }

    @ApiOperation({summary: "Deleting a user"})
    @ApiResponse({status: 204})
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @Delete('')
    async delete(@CurrentUser() currentUser) {
        const user = await this.userService.findOneById(currentUser.id)
        if (!user) {
            throw new NotFoundException(USER_NOT_FOUND_ERROR);
        }
        const result = await this.userService.deleteUser(user.id);
        return result;
    }
}
