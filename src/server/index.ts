import createHonoApp from "./app";
import configureOpenAPI from "./open-api";
import helloRouter from "./routes/hello/hello.index";
import tasksRouter from "./routes/tasks/tasks.index";

const app = createHonoApp();
configureOpenAPI(app);

const routes = [helloRouter, tasksRouter];

routes.forEach((route) => {
	app.route("/", route);
});

export default app;
