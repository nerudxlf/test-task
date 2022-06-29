import {Injectable} from '@nestjs/common';
import {ItemDto} from "./dto/item.dto";
import {InjectModel} from "@nestjs/sequelize";
import {ItemModel} from "./item.model";
import {use} from "passport";
import {PurchaseModel} from "../purchase/purchase.model";

@Injectable()
export class ItemService {

    constructor(@InjectModel(ItemModel) private itemRepository: typeof ItemModel) {
    }

    async findAllItems() {
        const items = await this.itemRepository.findAll();
        return items;
    }

    async createItem(dto: ItemDto, image: string) {
        const item = await this.itemRepository.create({...dto, image: image});
        return item;
    }

    async findItemByName(name: string) {
        const item = await this.itemRepository.findOne({where: {name: name}});
        return item;
    }

    async findItemById(id: number) {
        const item = await this.itemRepository.findOne({where: {id: id}});
        return item;
    }

    async getUserItems(userId: number) {
        const items = await this.itemRepository.findAll({include: [{model: PurchaseModel, where: {userid: userId}}]});
        return items;
    }

    async editItem(itemId: number, dto: ItemDto) {
        const item = await this.itemRepository.update(dto, {where: {id: itemId}});
        return item
    }
}
