import { Injectable } from '@nestjs/common';
import {UserModel} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {
    }

    async findOneById(id: number){
        const user = await this.userRepository.findOne({where: {id: id}});
        return user;
    }

    async createUser(dto: UserDto){
        const user = await this.userRepository.create(dto);
        return user;
    }

    async findOneByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email: email}});
        return user;
    }

    async addBalance(money: string){

    }
}
