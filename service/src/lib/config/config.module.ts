import { Global, Module } from "@nestjs/common"
import { ConfigModule as NestConfigModule, ConfigService } from "@nestjs/config"
import { list } from "./namespaces"

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            load: list,
            validationOptions: { abortEarly: true },
            cache: true,
            isGlobal: true,
            expandVariables: true,
            envFilePath: [".env", "production.env"]
        })
    ],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
