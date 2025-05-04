import { createRouter } from "../../app";
import * as handlers from "./hello.handlers";
import * as routes from "./hello.routes";

const helloRouter = createRouter().openapi(routes.hello, handlers.hello).openapi(routes.getHtml, handlers.getHtml);

export default helloRouter;
