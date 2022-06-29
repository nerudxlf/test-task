import {IsBoolean, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ItemDto{
    @ApiProperty({example: 'string', description: 'Item name'})
    @IsString()
    name: string;

    @ApiProperty({example: 'string', description: 'Item description'})
    @IsString()
    description: string;

    @ApiProperty({example: '200', description: 'Item price'})
    @IsString()
    price: string;

    @ApiProperty({example: true, description: 'Item enabled flag'})
    @IsBoolean()
    enabled: boolean;

    @ApiProperty({example: 'string', description: 'Item type'})
    @IsString()
    type: string;
}