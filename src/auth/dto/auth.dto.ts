import {IsString, Max, Min} from "class-validator";

export class AuthDto{

    @Max(64)
    @Min(1)
    @IsString()
    firstName: string;

    @Max(64)
    @Min(1)
    @IsString()
    lastName: string;

    @Min(4)
    @IsString()
    password: string;

    @IsString()
    email: string;

    @IsString()
    login: string;
}