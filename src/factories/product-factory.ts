import { Transaction } from "sequelize";
import { sequelize } from "../database/connection";
import { Product } from "../models/product";

import { BuyProductRequest } from "../types/product-types";
import { getCatalogById } from "./catalog-factory";
import { getUserByAddress, updateUser } from "./user-factory";

const createProduct = async (address: string, transaction?: Transaction | null) => {
    return Product.create({ address }, { transaction });
}

export const buyProduct = async (request: BuyProductRequest) => {
    if (request == null || request.id == null || request.address == null) {
        throw Error("Invalid body");
    }
    const [user, catalog] = await Promise.all([
        getUserByAddress(request.address, ["asset"]), getCatalogById(request.id)
    ]);

    if (parseFloat(user.cash1) < catalog.price.cost1
        || parseFloat(user.cash2) < catalog.price.cost2
        || parseFloat(user.cash3) < catalog.price.cost3) {
        return {
            success: false,
            error: {
                errorMessage: "Insufficent cash"
            }
        }
    }

    if (!(catalog.req.req1 != null
        && user.asset?.type === 1
        && user.asset?.level <= catalog.req.req1)) {
        return {
            success: false,
            error: {
                errorMessage: "Invalid building level"
            }
        }
    }

    const transaction = await sequelize.transaction();

    try {
        await Promise.all([
            updateUser(request.address, {
                cash1: (Number(user.cash1) - catalog.price.cost1).toFixed(2),
                cash2: (Number(user.cash2) - catalog.price.cost2).toFixed(2),
                cash3: (Number(user.cash3) - catalog.price.cost3).toFixed(2)
            }, transaction),
            createProduct(request.address, transaction)]);
        await transaction.commit();
        return {
            success: true,
            data: {
                resources: {
                    cash1: catalog.price.cost1,
                    cash2: catalog.price.cost2,
                    cash3: catalog.price.cost3
                }
            }
        }
    } catch (error) {
        await transaction.rollback();
    }
}