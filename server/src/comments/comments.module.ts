import { UsersModule } from './../users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { CommentResolver } from './comments.resolver';
import { Comment } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Module({
  providers: [CommentsService, CommentResolver],
  imports: [TypeOrmModule.forFeature([Comment]), RolesModule, UsersModule],
  exports: [CommentsService],
})
export class CommentsModule {}
