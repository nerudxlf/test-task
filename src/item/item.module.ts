import {Module} from '@nestjs/common';
import {ItemController} from './item.controller';
import {ItemService} from './item.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ItemModel} from "./item.model";
import {MulterModule} from "@nestjs/platform-express";

@Module({
    controllers: [ItemController],
    imports: [
        SequelizeModule.forFeature([ItemModel]),
        MulterModule.register({
            dest: './uploads',
        }),
    ],
    providers: [ItemService],
    exports: [ItemService]
})
export class ItemModule {
}
