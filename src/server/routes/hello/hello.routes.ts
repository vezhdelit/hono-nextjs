import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "@/helpers/route-define";
import { HTTP_STATUS_CODES } from "@/enums/server";

export const hello = createRoute({
	tags: ["Example"],
	method: "get",
	path: "/hello",
	responses: {
		[HTTP_STATUS_CODES.OK]: jsonContent(
			z.object({ message: z.string() }),
			"Returns a hello message"
		),
	},
});
export type HelloRoute = typeof hello;

export const getHtml = createRoute({
	tags: ["Example"],
	method: "get",
	path: "/html",
	responses: {
		//returns a html page
		[HTTP_STATUS_CODES.OK]: jsonContent(
			z.object({ message: z.string() }),
			"Returns a hello message"
		), [HTTP_STATUS_CODES.BAD_REQUEST]: jsonContent(
			z.object({ message: z.string() }),
			"Returns a bad request message"
		),
	},
});
export type GetHTMLRoute = typeof getHtml;
