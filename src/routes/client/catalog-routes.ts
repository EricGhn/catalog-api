import Router, { RouterContext } from 'koa-router';
import { getCatalogById } from '../../factories/catalog-factory';

export const catalogRouter = new Router();

const getCatalog = async (ctx: RouterContext) => {
    ctx.body = await getCatalogById(+ctx.params.id);
}

catalogRouter.get('/catalog/:id', getCatalog);

export default catalogRouter;