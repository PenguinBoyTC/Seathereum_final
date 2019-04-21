const Koa = require('koa');
const serve = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const path = require('path');

const app = new Koa();
const router = new Router();

if (process.env.NODE_ENV === 'production') {
  const root = path.join(__dirname, 'client', 'build');
  app.use(serve(root)).use(views(root), {extension: 'html'});
  router.get('*', async (ctx) => await ctx.render('index'));
}

app.use(router.routes()).use(router.allowedMethods());

if (!module.parent) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server listening on port ${port}...`));
}

module.exports = app;
