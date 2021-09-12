import { UploadFileResolver } from './upload-file.resolver';
import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';

@Module({
  providers: [UploadFileResolver, UploadFileService],
  exports: [UploadFileService],
  controllers: [UploadFileController],
})
export class UploadFileModule {}
