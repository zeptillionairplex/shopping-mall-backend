// src/app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { NgrokService } from './ngrok/ngrok.service';
import { Product } from './product/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 전역적으로 사용 가능
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Product],
        synchronize: true, // 개발 환경에서만 사용하세요. 프로덕션에서는 false로 설정하세요.
        logging: true,
      }),
    }),
    ProductModule,
  ],
  providers: [NgrokService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly ngrokService: NgrokService) {}

  async onModuleInit() {
    await this.ngrokService.getNgrokUrl();
  }
}