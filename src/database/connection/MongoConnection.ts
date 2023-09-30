import { Connection, createConnection } from 'mongoose';
import { MongoConstants } from './MongoConstant';

const mongoDbProvider = [
  {
    provide: MongoConstants.MONGO_PROVIDER,
    useFactory: () => {
      const connString = process.env.MONGO_URL;
      const conn: Connection = createConnection(connString);
      conn.on('connected', () =>
       {
        console.log('Connected to Database');
      });
      conn.on('error', () => {
        console.log('Error occured while connecting to database');
      });
      return conn; 
    },
    inject: [],
  },
];

export { mongoDbProvider };
