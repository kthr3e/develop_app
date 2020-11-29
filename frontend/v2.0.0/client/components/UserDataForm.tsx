import { faPersonBooth } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { menu_value, ResultType, result_value, shop_state } from "../recoil";
import { Text, Row } from "../styles/common";
import { sp } from "../styles/media";
import { Button } from "./Button";
import { GenderRadio } from "./GenderRadio";
import { InputNum } from "./InputNum";
import { MethodRadio } from "./MethodRadio";
import { OldSelect } from "./OldSelect";

export type FormData = {
  gender: string;
  old: string;
  up_value: string;
  menu: string[];
  shop: string[];
};

type Props = {
  method: "menu" | "shop";
};

/**
 * 性別、年齢、上限などを入力するフォーム
 */
export const UserDataForm: FC<Props> = ({ method }) => {
  const { reset, register, handleSubmit, errors } = useForm<FormData>();
  const shop = useRecoilValue(shop_state);
  const menu = useRecoilValue(menu_value);
  const set_result_value = useSetRecoilState<ResultType>(result_value);
  const router = useRouter();

  const on_submit = async (data: FormData) => {
    console.log(data);
    try {
      data["shop"] = method === "shop" ? shop : ["macdonalds", "dennys"];
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
    <Form onSubmit={handleSubmit(on_submit)}>
      <div
        css={`
          display: flex;
          margin-bottom: 100px;
          ${sp`
            flex-direction: column;
          `}
        `}>
        <div
          css={`
            flex: 1;
            margin: 0 20px;
          `}>
          <Text>性別</Text>
          <GenderRadio register={register} />
        </div>
        <div
          css={`
            flex: 1;
            margin: 0 20px;
          `}>
          <OldSelect register={register} />
          <InputNum register={register} />
        </div>
      </div>
      <Button type="submit">診断する</Button>
    </Form>
  );
};

const Form = styled.form``;
