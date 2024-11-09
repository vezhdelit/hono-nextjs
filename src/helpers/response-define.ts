import { z } from "zod";

type ZodSchema =
  | z.ZodUnion<[z.ZodTypeAny, z.ZodTypeAny]>
  | z.AnyZodObject
  | z.ZodArray<z.AnyZodObject>;

export const jsonContent = <T extends ZodSchema>(
  schema: T,
  description: string
) => {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
};


