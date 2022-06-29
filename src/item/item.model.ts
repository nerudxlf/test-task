import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {PurchaseModel} from "../purchase/purchase.model";


interface ItemCreate {
    name: string;
    description: string;
    image: string;
    price: string;
    enabled: boolean;
    type: string;
}


@Table({tableName: 'items'})
export class ItemModel extends Model<ItemModel, ItemCreate> {

    @ApiProperty({example: 1, description: 'Item Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "String", description: "Item Name"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @ApiProperty({example: "String", description: "Item Description"})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ApiProperty({example: "200", description: "Item Price"})
    @Column({type: DataType.STRING, allowNull: false})
    price: string;

    @ApiProperty({example: "200", description: "Item image"})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @ApiProperty({example: true, description: "Item Enabled"})
    @Column({type: DataType.BOOLEAN, allowNull: false})
    enabled: boolean;

    @ApiProperty({example: "String", description: "Item Type"})
    @Column({type: DataType.STRING, allowNull: false})
    type: string;

    @HasMany(() => PurchaseModel)
    itemPurchase: PurchaseModel[]
}
