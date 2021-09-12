import { createWriteStream } from 'fs';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';

@Resolver('Upload')
export class UploadFileResolver {
  constructor() {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename },
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `../../../src/uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', (e) => reject(e)),
    );
  }
}
