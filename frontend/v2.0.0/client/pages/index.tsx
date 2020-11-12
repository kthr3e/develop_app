import axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form } from "../components/Form";
import { useSetRecoilState } from "recoil";
import { ResultType, result_value } from "../recoil";
import { MenuList } from "../components/MenuList";

export type FormData = {
  gender: string;
  old: string;
  up_value: string;
  shop: string[];
};

export default function Home() {
  const { reset, handleSubmit, errors, register, formState } = useForm<
    FormData
  >();
  const set_result_value = useSetRecoilState<ResultType>(result_value);

  const on_submit = async (data: FormData) => {
    try {
      const arr = Object.values(data.shop).filter((el) => el !== undefined);
      console.log(arr);
      if (arr.length === 0) {
        throw new Error("Error");
      }
      data.shop = arr;
      console.log(data);
      const res = await axios.post("http://localhost:5000/api/check", {
        data,
      });
      console.log(res);
      set_result_value(res);
      reset();
    } catch (res) {
      console.log(res);
    }
  };
  return (
    <>
      <h3>1日に必要な栄養を取るためのメニューを診断！</h3>
      <p>
        あなたに必要な1日の栄養のうち、選んだメニューがどれだけ補えるか（充足率）をチェックすることができます。
      </p>
      <MenuList />
      <Form
        register={register}
        errors={errors}
        handle_submit={handleSubmit(on_submit)}
        is_loading={formState.isSubmitting}
      />
    </>
  );
}
