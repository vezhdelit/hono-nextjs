import createHonoApp from "./app";
import configureOpenAPI from "./open-api";
import helloRouter from "./routes/hello/hello.index";
import tasksRouter from "./routes/tasks/tasks.index";

const app = createHonoApp();
configureOpenAPI(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/api", helloRouter).route("/api", tasksRouter);

export type HonoAppType = typeof routes;
export default app;
