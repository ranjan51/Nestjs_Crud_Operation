import { Global, Module } from '@nestjs/common';
import { mongoDbProvider } from './connection/MongoConnection';
import { MongoConstants } from './connection/MongoConstant';
import { mongoDbModelsProvider } from './connection/MongoConnectionModel';

@Global()
@Module({
  imports: [],
  providers: [...mongoDbProvider, ...mongoDbModelsProvider],
  exports: [MongoConstants.MONGO_PROVIDER],
})
export class DatabaseModule {}