import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

//FIND ALL USERS
//ADD USER
//DELETE


//ADD TODO BASED ON USER ID
//FIND ALL TODOS BASED ON USER ID (NOT COMPLETED)
//FIND ALL TODOS BASED ON USER ID (COMPLETED)
//MARK TODO AS COMPLETE BASED ON TODO ID
//DELETE TODO BASED ON TODO ID

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ".env",
      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        //entities: ['dist/**/*.entity.{ts,js}'],
        //entities: [__dirname + '/../.entity{.ts, .js}'],
        //entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        logging: true
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
