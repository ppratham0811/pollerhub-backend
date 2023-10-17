import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities/Image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async createImage(name: string, data: Buffer): Promise<Image> {
    const image = new Image();
    image.name = name;
    image.data = data;
    return await this.imageRepository.save(image);
  }

  async getImageById(id: number): Promise<Image> {
    const image = await this.imageRepository.findOneBy({id : id});
    if (!image) {
      throw new BadRequestException('Image not found');
    }
    return image;
  }
}

