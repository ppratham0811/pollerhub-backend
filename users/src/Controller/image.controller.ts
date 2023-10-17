import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../Services/Image.service';
import { Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.imageService.createImage(file.originalname, file.buffer);
  }

  @Get()
  async serveImage(@Query('id') id: string, @Res() res: Response) {
    console.log("call")
    const image = await this.imageService.getImageById(parseInt(id, 10));
    res.set('Content-Type', 'image/jpg'); // Set the appropriate content type based on your image type
    res.send(image.data);
  }
}
