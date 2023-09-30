import { Injectable } from '@nestjs/common';
import { ProductsDao } from 'src/database/Dao/ProductDao';
import { ERROR_MESSAGES, WARN_MESSAGES } from 'src/shared/appMessages.schema';
import { createResponse } from 'src/shared/appresponse.shared';
import {HttpStatus} from '@nestjs/common'

@Injectable()
export class ProductsService {
    constructor(
        private readonly productDao:ProductsDao,
        ) {}

    public async getProductsSvc() {
        try {
            const products = await this.productDao.findAll();
            return products;
        } catch (error) {
            return createResponse(HttpStatus.BAD_REQUEST,ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
      }

      public async getProductByidSvc(id: any) {
        try {
            const product = await this.productDao.findById(id);
            if (!product) {
                return createResponse(404, ERROR_MESSAGES.INVALID_PRODUCT);
            }
            return product;
        } catch (error) {
            return createResponse(500, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }
    public async PostProductsSvc(product:any) {
        try {
            const products = await this.productDao.postDao(product);
            return products;
        } catch (error) {
            return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.CREATING_ERROR);
        }
      }


      public async updateProduct(id: string, updateProductDto: any) {
        try {
            const updatedProduct = await this.productDao.updateDao(id, updateProductDto);
            return updatedProduct;
        } catch (error) {
            return createResponse(404, ERROR_MESSAGES.INVALID_PRODUCT);

        }
    }


    async updateStockSvc(id: string) {
        try {
            const updatedProduct = await this.productDao.updatestockDao(id);
            return updatedProduct;
        } catch (error) {
            return createResponse(404, ERROR_MESSAGES.INVALID_PRODUCT)
               
        }
    }

    public async deleteProduct(id: string) {
        try {
            const deletedProduct = await this.productDao.deleteDao(id);
            return deletedProduct;
        } catch (error) {
            return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }
}
