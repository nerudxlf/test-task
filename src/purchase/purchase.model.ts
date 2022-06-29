import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../user/user.model";
import {ItemModel} from "../item/item.model";

interface PurchaseCreate{
    userid: number;
    itemid: number;
    date: Date;
    price: string;
}


@Table({tableName: 'purchases'})
export class PurchaseModel extends Model<PurchaseModel, PurchaseCreate>{

    @ApiProperty({example: 1, description: 'Purchase Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: 'User Id'})
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    userid: number;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @ForeignKey(() => ItemModel)
    @ApiProperty({example: 1, description: 'Item Id'})
    @Column({type: DataType.INTEGER, allowNull: false})
    itemid: number;

    @BelongsTo(() => ItemModel)
    item: ItemModel;

    @ApiProperty({example: '01.01.2022', description: 'Date'})
    @Column({type: DataType.DATE, allowNull: false})
    date: Date;

    @ApiProperty({example: "100", description: 'Item Price'})
    @Column({type: DataType.STRING, allowNull: false})
    price: string;
}
