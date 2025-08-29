import { NextFunction } from 'express';
import type { FastifyReply, FastifyRequest } from 'fastify';

export {};

interface ExtendedReq {
    realIp?: string;
    userId?: string;
    ip: string;
    i18nLang?: string;
    ips: string[];
};

declare global {
    namespace fastify {
        export interface FastifyRequest {
            raw: ExtendedReq
            realIp?: string;
            userId?: string;
            ip: string;
            i18nLang?: string;
            ips: string[];
            user?: User
        }
    }

    export type NestifyRequest = FastifyRequest & ExtendedReq & {
        raw: FastifyRequest['raw'] & ExtendedReq
    };
    export type NestifyResponse = FastifyReply;
    export type NestifyNextFunction = NextFunction;
}
