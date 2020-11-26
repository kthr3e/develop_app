import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { menu_value, ResultType, result_value, shop_state } from "../recoil";
import { Row } from "../styles/common";
import { old_options } from "../util/OldOptions";
import { Button } from "./Button";
import { Radio } from "./Radio";
import { Select } from "./Select";

export type FormData = {
  gender: string;
  old: string;
  up_value: string;
  menu: string[];
  shop: string[];
};

/**
 * 性別、年齢、上限などを入力するフォーム
 */
export const UserDataForm = () => {
  const { reset, handleSubmit, errors, register, control } = useForm<
    FormData
  >();
  const shop = useRecoilValue(shop_state);
  const menu = useRecoilValue(menu_value);
  const set_result_value = useSetRecoilState<ResultType>(result_value);

  const on_submit = async (data: FormData) => {
    const router = useRouter();
    console.log(data);
    try {
      data["shop"] = shop;
      data["menu"] = menu;
      console.log(data);
      const res = await Axios.post("http://localhost:5000/api/check", {
        data,
      });
      console.log(res);
      set_result_value(res);
      reset();
      router.push("/result");
    } catch (res) {
      console.log(res);
    }
  };
  return (
    <form onSubmit={handleSubmit(on_submit)}>
      <label>
        性別
        <Radio />
      </label>
      <label>
        年齢
        <Select />
      </label>
      <input type="number" name="up_value" ref={register} />
      <Button type="submit">診断する</Button>
    </form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;
