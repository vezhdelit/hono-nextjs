import createHonoApp from "./app";
import configureOpenAPI from "./open-api";
import helloRouter from "./routes/hello/hello.index";

const app = createHonoApp();
configureOpenAPI(app);

const routes = [helloRouter];

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
