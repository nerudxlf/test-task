import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {compare, genSalt, hash} from 'bcryptjs';
import {UserService} from "../user/user.service";
import {UserModel} from "../user/user.model";
import {JwtService} from "@nestjs/jwt";
import {PASSWORD_ERROR, USER_NOT_FOUND_ERROR} from "../constants";


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService
    ) {
    }


    async registration(dto: AuthDto) {
        const salt = await genSalt(10);
        const hashedPassword = await hash(dto.password, salt);
        const user = await this.userService.createUser({
            email: dto.email,
            login: dto.login,
            firstname: dto.firstName,
            lastname: dto.lastName,
            password: hashedPassword,
            balance: '0',
            role: 'User'
        });
        return user;
    }

    async validateUser(email: string, password: string): Promise<Pick<UserModel, 'id' | 'role'>> {
        const user = await this.userService.findOneByEmail(email)
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await compare(password, user.password);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(PASSWORD_ERROR);
        }
        return {id: user.id, role: user.role};
    }

    async login(id: number, role: string) {
        const payload = {id, role};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
