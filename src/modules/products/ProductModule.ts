import { Module } from '@nestjs/common';
import { ProductsController } from './ProductController';
import { ProductsService } from './ProductService';
import { MongoConstants } from 'src/database/connection/MongoConstant';
import { createProductModel } from '../../database/schema/products.schema'; 
import { DatabaseModule } from 'src/database/database.module';
import { Connection } from 'mongoose';
import { ProductsDao } from 'src/database/Dao/ProductDao';

@Module({
  imports:[DatabaseModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsDao,
    
    {
      provide: MongoConstants.PRODUCT_PROVIDER,
      useFactory: (connection: Connection) => createProductModel(connection),
      inject: [MongoConstants.MONGO_PROVIDER], 
    },
  ],
})
export class ProductsModule {}
