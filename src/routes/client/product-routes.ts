import Router, { RouterContext } from 'koa-router';
import { buyProduct } from '../../factories/product-factory';
import { BuyProductRequest } from '../../types/product-types';

const productRouter = new Router();

const buy = async (ctx: RouterContext) => {
    ctx.body = await buyProduct(ctx.request.body as BuyProductRequest);
}

productRouter.post('/buyProduct', buy);

export default productRouter;