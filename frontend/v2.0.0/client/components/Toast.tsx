import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { toast_value } from "../recoil";

export const Toast = () => {
  const [text, severity] = useRecoilValue(toast_value);
  const reset = useResetRecoilState(toast_value);

  useEffect(() => {
    if (!text) return;

    /** 3秒後に閉じる */
    const close = setTimeout(() => {
      reset();
    }, 3000);

    // clean up
    return () => {
      clearTimeout(close);
    };
  }, [text]);

  return (
    <>
      {text && (
        <Snackbar open anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert severity={severity}>{text}</Alert>
        </Snackbar>
      )}
    </>
  );
};
