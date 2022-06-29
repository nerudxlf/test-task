import {IsEmail, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto{
    @ApiProperty({example: 'string', description: 'User First name'})
    @IsString()
    firstname: string;

    @ApiProperty({example: 'string', description: 'User Last name'})
    @IsString()
    lastname: string;

    @ApiProperty({example: 'string', description: 'User Password'})
    @IsString()
    password: string;

    @ApiProperty({example: 'user@email.com', description: 'User email'})
    @IsEmail()
    email: string;

    @ApiProperty({example: 'string', description: 'User login'})
    @IsString()
    login: string;

    @ApiProperty({example: '200', description: 'User balance'})
    @IsString()
    balance: string;

    @ApiProperty({example: 'string', description: 'User role'})
    @IsString()
    role: string;

}