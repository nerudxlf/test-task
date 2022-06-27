import {Controller, Get, Patch, Post} from '@nestjs/common';

@Controller('item')
export class ItemController {

    @Get('list')
    async list(){

    }

    @Post('create')
    async create(){

    }

    @Patch('edit')
    async edit(){

    }
}
