import { GetTasksRoute, CreateTaskRoute } from "./tasks.routes";
import { RouteHandler } from "@hono/zod-openapi";
import db from "@/server/db";
import { tasks } from "@/server/db/schema";
import { HTTP_STATUS_CODES } from "@/enums/server";

export const getTasks: RouteHandler<GetTasksRoute> = async (c) => {
	const tasks = await db.query.tasks.findMany();
	return c.json(tasks);
};

export const createTask: RouteHandler<CreateTaskRoute> = async (c) => {
	const task = c.req.valid("json");
	const [inserted] = await db.insert(tasks).values(task).returning();
	return c.json(inserted, HTTP_STATUS_CODES.OK);
};
