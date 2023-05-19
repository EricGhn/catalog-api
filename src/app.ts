import Koa from 'koa';
import compose from 'koa-compose';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import clientCatalogRouter from "./routes/client/catalog-routes";
import clientProductRoutes from "./routes/client/product-routes";
import { connectToDatabase } from './database/connection';
import { PORT } from './configs/_constants';

const app = new Koa();

app.use(compose(
    [
        cors(),
        bodyParser(),
        clientCatalogRouter.routes(),
        clientProductRoutes.routes()
    ]));


(async () => {
    try {
        await connectToDatabase();
        app.listen(PORT);
    } catch (error) {
        process.exit(1);
    }
})();

