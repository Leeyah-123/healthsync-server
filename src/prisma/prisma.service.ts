import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // Get database URL from .env
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  // this function clears all records in the database
  // should be called in between tests
  cleanDb() {
    return this.$transaction([
      // delete everything in database
    ]);
  }
}
