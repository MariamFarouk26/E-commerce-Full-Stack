import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Readable } from 'stream';
import * as fs from 'fs';
@Injectable()
export class ProductsService {
  constructor(@InjectModel('products') private ProductsModel) {}

  async create(createProductDto: CreateProductDto) {
    let newproduct = new this.ProductsModel(createProductDto);
    let allProducts = await this.ProductsModel.find({});
    let lastProductID = allProducts[allProducts.length - 1].id;
    newproduct.id = lastProductID + 1;

    await newproduct.save();
    return { message: 'Added Successfully', data: newproduct };
  }

  findAll() {
    return this.ProductsModel.find({});
  }

  findOne(id: number) {
    return this.ProductsModel.findOne({ id: id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let updatedPro = await this.ProductsModel.updateOne(
      { id: id },
      { $set: updateProductDto },
    );
    return {
      Message: 'Updated',
      UpdatedProduct: updatedPro,
      Product: await this.ProductsModel.find({ id: id }),
    };
  }

  async remove(id: number) {
    let remainderproduct = await this.ProductsModel.findOneAndDelete({
      id: id,
    });
    return { message: 'deleted Successfully', data: remainderproduct };
  }
  findByCategoryAndSub(Category: string, subCategory: string) {
    return this.ProductsModel.find({
      category: Category,
      subcategory: subCategory,
    });
  }
  findByCategory(category: string) {
    return this.ProductsModel.find({ category });
  }
  async createSellerProduct(formData: any, images: Array<Express.Multer.File>) {    // Process the FormData and image files here
    const productData = {
      id: 0,
      price: formData.price,
      sold: formData.sold,
      ratings: formData.ratings,
      quantity: formData.quantity,
      title: formData.title,
      description: formData.description,
      subcategory: formData.subcategory,
      brand: formData.brand,
      category: formData.category,
      images: [], // Placeholder for image URLs
      comments:[],
      substitutes: [],
      boycott: formData.boycott,
    };

  

    for (const image of images) {
      const filePath = `public/${image.originalname}`;
      const readStream = Readable.from(image.buffer);
      const writeStream = fs.createWriteStream(filePath);
      await new Promise<void>((resolve, reject) => {
        readStream.pipe(writeStream);
        writeStream.on('error', (error) => {
          console.error('Error copying file:', error);
          reject(error);
        });
        writeStream.on('finish', () => {
          console.log('File copied successfully.');
          let newFilePath = filePath.split('/')[1];
          let completefilepath='http://localhost:3001/' + newFilePath
          // Push the URL of the uploaded image into the productData.images array
          productData.images.push(completefilepath);
          resolve();
        });
      });
    }
    let allProducts = await this.ProductsModel.find({});
    let lastProductID = allProducts[allProducts.length - 1].id;
    productData.id = lastProductID + 1;

    // Save the product data to the database
    const createdProduct = new this.ProductsModel(productData);
 
    let yourproduct= await createdProduct.save();
    return { message: 'Added Successfully', data: yourproduct };
  }
}
