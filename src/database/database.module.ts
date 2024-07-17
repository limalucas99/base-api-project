import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/../**/*.entity.js'],
          migrations: [__dirname + '/migrations/**/*.js'],
          synchronize: configService.get('ENV') === 'production' ? false : true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
