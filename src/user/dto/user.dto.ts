import {IsString, Max, Min} from "class-validator";

export class UserDto{
    @Max(64)
    @Min(1)
    @IsString()
    firstName: string;

    @Max(64)
    @Min(1)
    @IsString()
    lastName: string;

    @IsString()
    hashedPassword: string;

    @IsString()
    email: string;

    @IsString()
    login: string;

    @IsString()
    balance: string;

    @IsString()
    role: string;

}