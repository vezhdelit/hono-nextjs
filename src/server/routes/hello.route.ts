import { createRoute, z } from "@hono/zod-openapi";
import { createRouter } from "../app";
import { jsonContent } from "@/helpers/response-define";
import { HTTP_STATUS_CODES } from "@/enums/server";

const helloRouter = createRouter().openapi(
  createRoute({
    tags: ["Example"],
    method: "get",
    path: "/api/hello",
    responses: {
      [HTTP_STATUS_CODES.OK]: jsonContent(
        z.object({ message: z.string() }),
        "Returns a hello message"
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Hello from Hono!",
      },
      HTTP_STATUS_CODES.OK
    );
  }
);

export default helloRouter;
