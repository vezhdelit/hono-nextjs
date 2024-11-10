import { createRoute, z } from "@hono/zod-openapi";
import {
	createErrorSchema,
	jsonContent,
	jsonContentRequired,
} from "@/helpers/route-define";
import { HTTP_STATUS_CODES } from "@/enums/server";
import { insertTasksSchema, selectTasksSchema } from "@/server/db/schema";

const tags = ["Tasks"];

export const getTasks = createRoute({
	tags,
	path: "/api/tasks",
	method: "get",
	responses: {
		[HTTP_STATUS_CODES.OK]: jsonContent(
			z.array(selectTasksSchema),
			"The list of tasks"
		),
	},
});

export const createTask = createRoute({
	tags,
	path: "/api/tasks",
	method: "post",
	request: {
		body: jsonContentRequired(insertTasksSchema, "Task to create"),
	},
	responses: {
		[HTTP_STATUS_CODES.OK]: jsonContent(selectTasksSchema, "Created task"),
		[HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(insertTasksSchema),
			"Validation error"
		),
	},
});

export type GetTasksRoute = typeof getTasks;
export type CreateTaskRoute = typeof createTask;
