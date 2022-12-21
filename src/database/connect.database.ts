import mongoose from 'mongoose';
import Logger from '../client/logger.client';
import { config } from '../config';

mongoose.set('strictQuery', false);

export default mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logger.info(`Connected to the database called ${config.mongo.username}.`)  
    })
    .catch((error) => {
        throw new Error(error)
    });
