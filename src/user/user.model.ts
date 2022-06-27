import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";


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

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    firstname: string;

    @Column({type: DataType.STRING, allowNull: false})
    lastname: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    balance: string;

    @Column({type: DataType.STRING, allowNull: false})
    role: string;
}
