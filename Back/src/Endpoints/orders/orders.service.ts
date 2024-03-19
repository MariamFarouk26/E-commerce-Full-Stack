/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('orders') private ordersModel) {}
  async create(createOrderDto: CreateOrderDto) {
    let allOrders = await this.ordersModel.find({});
    let lastOrderID = allOrders[allOrders.length - 1]?.orderID || 0;
    createOrderDto.orderID = lastOrderID + 1;
    let newOrder = new this.ordersModel(createOrderDto);
    await newOrder.save();
    return { message: 'Added Successfully', data: newOrder };
  }

  findAll() {
    return this.ordersModel.find({});
  }

  findOne(id: number) {
    return this.ordersModel.findOne({ orderID: id });
  }

  findOneByUserID(id: number) {
    return this.ordersModel.find({ userID: id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    let updatedOrder = await this.ordersModel.updateOne(
      { orderID: id },
      { $set: updateOrderDto },
    );
    return {
      Message: 'Updated',
      UpdatedProduct: updatedOrder,
      Orders: await this.ordersModel.find({ orderID: id }),
    };
  }

  async remove(id: number) {
    let remainderproduct = await this.ordersModel.findOneAndDelete({
      orderID: id,
    });
    return { message: 'deleted Successfully', data: remainderproduct };
  }
  async findByCategory(Category: string) {
    let orders = await this.ordersModel.find({});
    let desiredOrders = [];

    for (let i = 0; i < orders.length; i++) {
      let orderCategories = orders[i].category;
      for (let j = 0; j < orderCategories.length; j++) {
        if (orderCategories[j] == Category) {
          desiredOrders.push(orders[i]);
          break;
        }
      }
    }
    return desiredOrders;
  }
}
