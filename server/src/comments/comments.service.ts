import { UsersService } from './../users/users.service';
import { RolesService } from './../roles/roles.service';
import { Comment } from './comments.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { commentDto } from './dto/commentDto';
import { roles } from 'src/roles/models/roles';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private rolesService: RolesService,
    private userServise: UsersService,
  ) {}

  async createComment(dto: commentDto, userId: number) {
    const commentData = {
      ...dto,
      userId,
    };
    const comment = await this.commentsRepository.save(commentData);
    return comment;
  }

  async updateComment(id: number, dto: commentDto, userId: number) {
    const comment = await this.commentsRepository.findOne(id);

    const userCommentId = comment.userId;

    if (userId === userCommentId) {
      await this.commentsRepository.update(id, dto);
      return await this.commentsRepository.findOne(id);
    } else {
      throw new Error('No permission to update comment');
    }
  }

  async deleteComment(id: number, userId: number, userRoleId: number) {
    const comment = await this.commentsRepository.findOne(id);
    const userCommentId = comment.userId;
    const userRole = (await this.rolesService.findRole(userRoleId)).title;

    if (userId === userCommentId || userRole === roles.ADMIN) {
      await this.commentsRepository.delete({ id });
    } else {
      throw new Error('No permission to delete comment');
    }
  }

  async findComment(id: number) {
    const comment = await this.commentsRepository.findOne({ id });

    return comment;
  }

  async findComments(id: number) {
    const comments = await this.commentsRepository.find({
      where: { articleId: id },
    });

    return comments;
  }

  async getUserComment(id: number) {
    const user = await this.userServise.findUserById(id);
    return user;
  }
}
