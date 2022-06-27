import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {ItemModule} from './item/item.module';
import {PurchaseModule} from './purchase/purchase.module';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';
import {UserModel} from "./user/user.model";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [UserModel],
            define: {
                timestamps: false
            }
        }),
        AuthModule,
        UserModule,
        ItemModule,
        PurchaseModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
