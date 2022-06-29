import {BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {LoginDto} from "./dto/login.dto";
import {USER_IS_ALREADY_REGISTERED_ERROR} from "../constants";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(201)
    @Post('register')
    async registration(@Body() dto: AuthDto) {
        const oldUser = await this.userService.findOneByEmail(dto.email);
        if(oldUser){
            throw new BadRequestException(USER_IS_ALREADY_REGISTERED_ERROR)
        }
        const user = await this.authService.registration(dto);
        const token = await this.authService.login(user.id, user.role);
        return token;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.authService.validateUser(dto.email, dto.password);
        const token = await this.authService.login(user.id, user.role);
        return token;
    }
}
