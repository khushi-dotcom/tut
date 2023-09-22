import { Injectable } from '@nestjs/common';
import {PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
//create logic that connects to the database
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService)
    {
        super({
            datasources:{
                db:{
                    url: config.get('DATABASE_URL'),
                }
            }
        });
        //console.log(config.get('DATABASE_URL'));
    }
}
