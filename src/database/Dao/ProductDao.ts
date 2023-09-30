import { Model } from 'mongoose';
import { MongoConstants } from '../connection/MongoConstant';
import { Inject } from '@nestjs/common';


export class ProductsDao {
  @Inject(MongoConstants.PRODUCT_PROVIDER) private readonly  productmodel: Model<any>


  async findAll() {
    const products = await this.productmodel.find();
    return products;
  }


  async findById(id:any) {
    const product = await this.productmodel.findById(id);
    return product;
  }

  
  async postDao(product:any) {
    const newProduct = await this.productmodel.create(product);
    return newProduct;
  }


  async updateDao(id: string, updateProductDto: any) {
    const updatedProduct = await this.productmodel.findByIdAndUpdate(id, updateProductDto, { new: true });
    return updatedProduct;  
}


  async updatestockDao(id: string) {
    try {
        const product = await this.productmodel.findById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        product.stock = {
            quantity: 0,
            inStock: false
        };

        const updatedProduct = await product.save();

        return updatedProduct;
    } catch (error) {
        console.log(error);
        throw new Error('Error updating stock');
    }
}

async deleteDao(id: string) {
  try {
      const deletedProduct = await this.productmodel.findByIdAndDelete(id);
      return deletedProduct;
  } catch (error) {
      throw error; 
  }
}
}