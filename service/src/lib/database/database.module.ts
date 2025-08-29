import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigService } from "@nestjs/config"


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                database: configService.get("mysql.database"),
                host: configService.get("mysql.host"),
                port: configService.get("mysql.port"),
                username: configService.get("mysql.user"),
                password: configService.get("mysql.password"),
                entities: [],
                synchronize: true,
                logging: true
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}
