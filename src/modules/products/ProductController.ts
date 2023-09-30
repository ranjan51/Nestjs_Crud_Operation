//swagger

import { Controller, Get, Post, Body, Res, Patch, Param, Put, HttpStatus,Delete, NotFoundException } from '@nestjs/common';
import { ProductsService } from './ProductService';
import { CreateProductDto } from 'src/database/Dto/productsDto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/shared/appMessages.schema';
import { ApiTags } from "@nestjs/swagger";

@Controller('products')
export class ProductsController {
    
    constructor(private readonly productservice:ProductsService) {}
@ApiTags('Products')
    @Get()
    async getAllProducts(@Res() res:any) {
        try {
            const products = await this.productservice.getProductsSvc();
            return res.status(HttpStatus.OK)
            .json({
                message:SUCCESS_MESSAGES.SUCCESS,
                products
            });
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(ERROR_MESSAGES.NOT_FOUND);

        }
    }
    
    @ApiTags('getbyid')
    @Get(':id')
    async getProductById(@Param('id') id: string, @Res() res:any) {
        try {
            const product = await this.productservice.getProductByidSvc(id);
            return res.status(HttpStatus.OK).send(product);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }
    @ApiTags('post')
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto, @Res() res:any) {
        try { 
            const newProduct = await this.productservice.PostProductsSvc(createProductDto);
            return res.status(HttpStatus.CREATED).send({MESSAGE: SUCCESS_MESSAGES.CREATED,newProduct});
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGES.CREATING_ERROR);
        }
    }

    @ApiTags('post')
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: CreateProductDto, @Res() res:any) {
        try {
            const updatedProduct = await this.productservice.updateProduct(id, updateProductDto);
            return res.status(HttpStatus.OK).send(updatedProduct);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
        
    }

    @Patch('stock/:id')
    async updateStock(@Param('id') id: string, @Res() res:any) {
        try {
            const updatedStock = await this.productservice.updateStockSvc(id);
            return res.status(HttpStatus.OK).send(updatedStock);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiTags('Delete')

    @Delete('delete/:id')
    async deleteProduct(@Param('id') id: string, @Res() res: any) {
        try {
            const deletedProduct = await this.productservice.deleteProduct(id);
            if (!deletedProduct) {
                return res.status(HttpStatus.NOT_FOUND).send(ERROR_MESSAGES.NOT_FOUND);
            }
            return res.status(HttpStatus.OK).send(deletedProduct);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }

}
