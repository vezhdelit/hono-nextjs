import { HTTP_STATUS_CODES } from "@/enums/server";
import { GetHTMLRoute, HelloRoute } from "./hello.routes";
import { RouteHandler } from "@hono/zod-openapi";
import axios from "axios";

export const hello: RouteHandler<HelloRoute> = async (c) => {
	return c.json(
		{
			message: "Hello from Hono!",
		},
		HTTP_STATUS_CODES.OK
	);
};

export const getHtml: RouteHandler<GetHTMLRoute> = async (c) => {
	const { url } = c.req.query();
	if (!url) {
		return c.json(
			{
				message: "URL is required",
			},
			HTTP_STATUS_CODES.BAD_REQUEST
		);
	}

	const response = await axios.get(url);

	const html = response.data;

	return c.json(
		{
			message: html,
		},
		HTTP_STATUS_CODES.OK
	);
}