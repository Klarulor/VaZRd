import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";

@Injectable()
export class ServiceService implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): any {

    }
    onModuleDestroy(): any {

    }
}