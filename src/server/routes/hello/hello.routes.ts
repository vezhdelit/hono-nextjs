import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "@/helpers/response-define";
import { HTTP_STATUS_CODES } from "@/enums/server";

export const hello = createRoute({
  tags: ["Example"],
  method: "get",
  path: "/api/hello",
  responses: {
    [HTTP_STATUS_CODES.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Returns a hello message"
    ),
  },
});

export type Hello = typeof hello;