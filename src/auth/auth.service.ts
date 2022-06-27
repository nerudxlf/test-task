import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {compare, genSalt, hash} from 'bcryptjs';
import {UserService} from "../user/user.service";
import {UserModel} from "../user/user.model";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService
    ) {}


    async registration(dto: AuthDto) {
        const salt = await genSalt(10);
        const hashedPassword = await hash(dto.password, salt);
        const user = await this.userService.createUser({...dto, hashedPassword: hashedPassword, balance: '0', role: 'User'});
        return user;
    }

    async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>>{
        const user = await this.userService.findOneByEmail(email)
        if(!user){
            throw new UnauthorizedException('');
        }
        const isCorrectPassword = await compare(password, user.password);
        if(!isCorrectPassword){
            throw new UnauthorizedException('');
        }
        return {email: user.email};
    }

    async login(email: string){
        const payload = {email};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
