import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";
import {PurchaseModel} from "../purchase/purchase.model";


interface UserCreate {
    email: string;
    firstName: string;
    lastName: string;
    login: string;
    password: string;

}

@Table({tableName: 'users'})
export class UserModel extends Model<UserModel, UserCreate> {
    @ApiProperty({example: 1, description: 'User Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "string@mail.com", description: 'User Email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: "string", description: 'User first name'})
    @Column({type: DataType.STRING, allowNull: false})
    firstname: string;

    @ApiProperty({example: "string", description: 'User last name'})
    @Column({type: DataType.STRING, allowNull: false})
    lastname: string;

    @ApiProperty({example: "string", description: 'User login'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @ApiProperty({example: "string", description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: "200", description: 'User Balance'})
    @Column({type: DataType.STRING, allowNull: false})
    balance: string;

    @ApiProperty({example: "string", description: 'User Role'})
    @Column({type: DataType.STRING, allowNull: false})
    role: string;

    @HasMany(() => PurchaseModel)
    userPurchase: PurchaseModel[]
}
