import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {PurchaseModel} from "./purchase.model";
import {ItemModel} from "../item/item.model";

@Injectable()
export class PurchaseService {
    constructor(@InjectModel(PurchaseModel) private purchaseRepository: typeof PurchaseModel) {
    }

    async buyItem(item: ItemModel, userid: number){
        const buy = await this.purchaseRepository.create({
            itemid: item.id,
            price: item.price,
            userid: userid,
            date: new Date()
        })
        return buy;
    }

    async getUserHistory(userId: number){
        const result = await this.purchaseRepository.findAll({where: {userid: userId}});
        return result;
    }
}
