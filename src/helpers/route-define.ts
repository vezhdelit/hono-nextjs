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

export const jsonContentRequired = <T extends ZodSchema>(
	schema: T,
	description: string
) => {
	return {
		...jsonContent(schema, description),
		required: true,
	};
};

export const createErrorSchema = <T extends ZodSchema>(schema: T) => {
	const { error } = schema.safeParse(
		schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray ? [] : {}
	);
	return z.object({
		success: z.boolean().openapi({
			example: false,
		}),
		error: z
			.object({
				issues: z.array(
					z.object({
						code: z.string(),
						path: z.array(z.union([z.string(), z.number()])),
						message: z.string().optional(),
					})
				),
				name: z.string(),
			})
			.openapi({
				example: error,
			}),
	});
};
