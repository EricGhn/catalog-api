import { Sequelize } from 'sequelize-typescript';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../configs/_constants';
import { Asset } from '../models/asset';
import { Catalog } from '../models/catalog';
import { Product } from '../models/product';
import { User } from '../models/User';


export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
});

sequelize.addModels([Catalog, Product, Asset, User]);

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        throw error;
    }
};