import { Hook, OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serverEnv } from "@/env/server";

import { StatusCode } from "hono/utils/http-status";
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } from "@/enums/server";

export default function createHonoApp() {
	const app = createRouter();

	app.use(cors());
	app.use(logger());

	app.notFound((c) => {
		return c.json(
			{
				message: `${HTTP_STATUS_MESSAGES.NOT_FOUND} - ${c.req.path}`,
			},
			HTTP_STATUS_CODES.NOT_FOUND
		);
	});

	app.onError((err, c) => {
		const currentStatus =
			"status" in err ? err.status : c.newResponse(null).status;
		const statusCode =
			currentStatus !== HTTP_STATUS_CODES.OK
				? (currentStatus as StatusCode)
				: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
		return c.json(
			{
				message: `${err.message}`,
				stack:
					serverEnv.NODE_ENV == "development" ? err.stack : undefined,
			},
			statusCode
		);
	});

	return app;
}

export function createRouter() {
	return new OpenAPIHono({
		strict: false,
		defaultHook,
	});
}

// eslint-disable-next-line
const defaultHook: Hook<any, any, any, any> = (result, c) => {
	if (!result.success) {
		return c.json(
			{
				success: result.success,
				error: result.error,
			},
			HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY
		);
	}
};
