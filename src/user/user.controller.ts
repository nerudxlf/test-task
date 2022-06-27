import {Controller, Get, Param} from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get(':id')
    async get(@Param('id') id: number){

    }
}
