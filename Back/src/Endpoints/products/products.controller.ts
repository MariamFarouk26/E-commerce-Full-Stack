import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from '../user/roles.enum';
import { UserRoles } from '../user/roles.decoretor';

import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @UserRoles(Role.Admin, Role.Seller)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @Get('/:category/:subCategory')
  findByCategoryAndSub(
    @Param('category') category: string,
    @Param('subCategory') subCategory: string,
  ) {
    return this.productsService.findByCategoryAndSub(category, subCategory);
  }
  @Get('findByCategory/category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category);
  }
  @UserRoles(Role.Admin, Role.Seller, Role.User)
  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }
  @UserRoles(Role.Admin, Role.Seller)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
  @Post('/sellerProducts')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  async createSellerProduct(
    @UploadedFiles() files: { images: Express.Multer.File[] },
    @Body() formData: any,
  ) {
    try {
      const result = await this.productsService.createSellerProduct(
        formData,
        files.images,
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
