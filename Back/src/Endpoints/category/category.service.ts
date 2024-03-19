import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('category') private categoryModel) {}
  async create(createCategoryDto: CreateCategoryDto) {
    let findCategory = await this.categoryModel.findOne({
      category: createCategoryDto.category,
    });
    if (findCategory) {
      return { message: 'Category already exsists ' };
    }
    let allCategories = await this.categoryModel.find({});
    let lastCategoriID = allCategories[allCategories.length - 1].id;
    createCategoryDto.id = lastCategoriID + 1;
    let newproduct = new this.categoryModel(createCategoryDto);
    await newproduct.save();
    return { message: 'Added Successfully', data: newproduct };
  }

  findAll() {
    return this.categoryModel.find({});
  }

  findOne(id: number) {
    return this.categoryModel.find({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let updatedPro = await this.categoryModel.updateOne(
      { id },
      { $set: updateCategoryDto },
    );
    return {
      Message: 'Updated',
      updatedCategory: updatedPro,
      Category: await this.categoryModel.find({ id }),
    };
  }

  async remove(id: number) {
    let deleUser = await this.categoryModel.deleteOne({ id });
    return { message: 'Category Deleted', deleUser };
  }
}
