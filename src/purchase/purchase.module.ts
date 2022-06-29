import {Module} from '@nestjs/common';
import {PurchaseController} from './purchase.controller';
import {PurchaseService} from './purchase.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {PurchaseModel} from "./purchase.model";
import {ItemModule} from "../item/item.module";
import {UserModule} from "../user/user.module";

@Module({
    controllers: [PurchaseController],
    imports: [
        SequelizeModule.forFeature([PurchaseModel]),
        ItemModule,
        UserModule,
    ],
    providers: [PurchaseService],
    exports: [PurchaseService]
})
export class PurchaseModule {
}
