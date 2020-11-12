import React from "react";
import { FC } from "react";
import styled from "styled-components";
import { old_options } from "../util/OldOptions";

type Props = {
  errors: any;
  register: any;
  handle_submit: any;
  is_loading: boolean;
};

/**
 * 性別、年齢、上限などを入力するフォーム
 */
export const Form: FC<Props> = ({
  errors,
  register,
  handle_submit,
  is_loading,
}) => (
  <form onSubmit={handle_submit}>
    <label>性別</label>
    <label>
      男性
      <input type="radio" value="0" name="gender" ref={register} />
    </label>
    <label>
      女性
      <input type="radio" name="gender" value="1" ref={register} />
    </label>
    {errors.gender && <p>{errors.gender.message}</p>}
    <label>
      年齢
      <select name="old" ref={register({ required: "年齢を選択してください" })}>
        {old_options.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
    {errors.old && <p>{errors.old.message}</p>}
    <label>
      上限
      <input type="number" name="up_value" ref={register} />
    </label>
  </form>
);
