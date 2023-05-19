import { Catalog } from "../models/catalog";

export const getCatalogById = async (id: number) => {
    const catalog = await Catalog.findByPk(id, { raw: true });
    if (catalog == null) {
        throw new Error("Catalog not found");
    }
    const { cost1, cost2, cost3, req1, req2, req3, ...rest } = catalog;
    return {
        ...rest,
        price: {
            cost1,
            cost2,
            cost3
        },
        req: {
            req1,
            req2,
            req3
        }
    };
}