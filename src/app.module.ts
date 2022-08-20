import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './reports/report.entity';
// import { MessagesController } from './messages/messages.controller';
// import { MessagesModule } from './messages/messages.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';

// import { MessagesModule } from './messages/messages.module';

@Module({
  // imports: [MessagesModule],MessagesController
  controllers: [AppController,],
  providers: [AppService],
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User,Report],
    synchronize: true
  })],
  // imports: [MessagesModule],
})
export class AppModule { }
