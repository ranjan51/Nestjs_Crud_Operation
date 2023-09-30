import { Connection, Schema, SchemaTypes, model } from 'mongoose';
import { ProductsEnum } from 'src/shared/enums.shared';


const productSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  des: {
    type: SchemaTypes.String,
    required: true,
  },
  price: {
    type: SchemaTypes.Number,
    required: true,
    min: 0,
  },
  category: {
    type: SchemaTypes.String,
    enum: ProductsEnum,
  },
  stock: {
    quantity: {
      type: SchemaTypes.Number,
      default: 0,
    },
    inStock: {
      type: SchemaTypes.Boolean,
      default: false,
    },
  },
  ISOReview:
    {
      rating: {
        type: SchemaTypes.Number, 
        min: 1,
        max: 5,
        required: true,
      },
      remarks: SchemaTypes.String,
      date: {
        type: SchemaTypes.Date,
        default: Date.now,
      },
  }
});


interface IReview {
  rating: number;
  text?: string;
  date?: Date;
}


export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: ProductsEnum;
  stock: {
    quantity: number;
    inStock: boolean;
  };
  reviews: IReview[];
}


const createProductModel = (conn: Connection) =>
  conn.model<IProduct>('Products', productSchema, 'Products');
export { createProductModel, productSchema };


