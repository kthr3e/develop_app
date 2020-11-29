import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Chart } from "../components/Chart";
import { result_value } from "../recoil";

export default function Result() {
  const result = useRecoilValue(result_value);
  const router = useRouter();

  useEffect(() => {
    if (result.length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      {result === "error" ? (
        <h1>そんな都合のいいメニューはありません！</h1>
      ) : (
        <Chart result={result[1] as { [name: string]: string }} />
      )}
    </div>
  );
}
