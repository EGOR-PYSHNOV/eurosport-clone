import { FileType, UploadFileService } from './upload-file.service';
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/upload-file')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}
  @Post()
  @UseInterceptors(FileInterceptor('upload'))
  create(@UploadedFile() file) {
    const url = this.uploadFileService.createFileEditor(FileType.IMAGE, file);

    return {
      uploaded: true,
      url: `${process.env.SUITE_URL || 'http://localhost:5000/'}${url}`,
    };
  }
}
