import { createRouter } from "../../app";
import * as handlers from "./tasks.handlers";
import * as routes from "./tasks.routes";

const tasksRouter = createRouter()
	.openapi(routes.getTasks, handlers.getTasks)
	.openapi(routes.createTask, handlers.createTask);

export default tasksRouter;
