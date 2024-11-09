import { clientEnvs } from "@/env/client";
import axios from "axios";
import { Suspense } from "react";

const getMessage = async () => {
  const result = await axios.get(clientEnvs.NEXT_PUBLIC_DOMAIN + "/api/hello");
  return result.data;
};

export default async function Home() {
  const message = await getMessage();
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col text-white bg-zinc-800 p-5 rounded-2xl">
        <p>/api/hello</p>
        <p className="text-nowrap">
          <Suspense fallback={<span>Loading...</span>}>
            <span>{message.message}</span>
          </Suspense>
        </p>
      </div>
    </div>
  );
}
