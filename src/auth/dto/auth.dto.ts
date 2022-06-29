import {IsEmail, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AuthDto{
    @ApiProperty({example: 'string', description: 'User first name'})
    @IsString()
    firstName: string;

    @ApiProperty({example: 'string', description: 'User last name'})
    @IsString()
    lastName: string;

    @ApiProperty({example: 'string', description: 'User password'})
    @IsString()
    password: string;

    @ApiProperty({example: 'user@email.com', description: 'User email'})
    @IsEmail()
    email: string;

    @ApiProperty({example: 'string', description: 'User login'})
    @IsString()
    login: string;
}