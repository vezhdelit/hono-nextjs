import axios from "axios";
import { Suspense } from "react";

const getMessage = async () => {
  const result = await axios.get(process.env.BASE_URL + "/api/hello");
  return result.data;
}


export default async function Home() {
  const message = await getMessage();
  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <h1>{message.message}</h1>
      </Suspense>
    </div>
  );
}
