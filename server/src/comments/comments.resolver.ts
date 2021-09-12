import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { CurrentUser } from './../auth/current-user.decorator';
import { commentDto } from './dto/commentDto';
import { CommentsService } from './comments.service';
import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Comment } from './comments.entity';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(private commentsService: CommentsService) {}

  @Mutation((returns) => Comment)
  @UseGuards(GqlAuthGuard)
  async createComment(
    @CurrentUser() user: User,
    @Args() commentDto: commentDto,
  ) {
    return this.commentsService.createComment(commentDto, user.id);
  }

  @Mutation((returns) => Comment)
  @UseGuards(GqlAuthGuard)
  async updateComment(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args() commentDto: commentDto,
  ) {
    return this.commentsService.updateComment(id, commentDto, user.id);
  }

  @Mutation(() => Comment, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteComment(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.commentsService.deleteComment(id, user.id, user.roleId);
  }

  @Query((returns) => Comment)
  async getComment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Comment> {
    return await this.commentsService.findComment(id);
  }

  @Query((returns) => [Comment])
  async getComments(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Comment[]> {
    return await this.commentsService.findComments(id);
  }

  @ResolveField((returns) => User)
  async user(@Parent() comment: Comment) {
    return await this.commentsService.getUserComment(comment.userId);
  }
}
