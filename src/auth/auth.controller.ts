import {Controller, HttpCode, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {LoginDto} from "./dto/login.dto";


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
            throw new HttpException('', HttpStatus.BAD_REQUEST);
        }
        const result = await this.authService.registration(dto);
        return result
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        console.log(dto);
        const user = await this.authService.validateUser(dto.email, dto.password);
        const token = await this.authService.login(user.email);
        return token;
    }
}
