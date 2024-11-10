import { HTTP_STATUS_CODES } from "@/enums/server";
import { HelloRoute } from "./hello.routes";
import { RouteHandler } from "@hono/zod-openapi";

export const hello: RouteHandler<HelloRoute> = async (c) => {
	return c.json(
		{
			message: "Hello from Hono!",
		},
		HTTP_STATUS_CODES.OK
	);
};
