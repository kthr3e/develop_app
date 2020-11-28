import { faPersonBooth } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { menu_value, ResultType, result_value, shop_state } from "../recoil";
import { Row } from "../styles/common";
import { old_options } from "../util/OldOptions";
import { Button } from "./Button";
import { InputNum } from "./InputNum";
import { Radio } from "./Radio";
import { OldSelect } from "./OldSelect";

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
  const { reset, register, handleSubmit, errors } = useForm<FormData>();
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
    <Form onSubmit={handleSubmit(on_submit)}>
      <div
        css={`
          display: flex;
          grid-area: gender;
          justify-content: center;
        `}>
        性別
        <Radio
          name="gender"
          icon={faPersonBooth}
          label="男性"
          register={register}
        />
        <Radio
          name="gender"
          icon={faPersonBooth}
          label="女性"
          register={register}
        />
      </div>
      <OldSelect register={register} />
      <InputNum register={register} />
      <Button type="submit">診断する</Button>
    </Form>
  );
};

const Form = styled.form`
  display: grid;
  grid-template:
    "... gender gender ..." 150px
    "... ... ... ..." 20px
    "... old up_value ..." 100px
    "... ... ... ..." 20px
    "... button button ..." 100px
    /1fr 400px 400px 1fr;
`;
