import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useHello = () => {
	const query = useQuery({
		queryKey: ["hello"],
		queryFn: async () => {
			const response = await client.api.hello.$get();

			if (!response.ok) {
				return { message: "Failed to fetch hello message" };
			}
			const data = await response.json();
			return data;
		},
	});

	return query;
};
