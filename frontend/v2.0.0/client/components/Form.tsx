import React from "react";
import { FC } from "react";
import styled from "styled-components";
import { Column, Row } from "../styles/common";

type Props = {
  control: any;
  errors: any;
  register: any;
};

/**
 * 性別、年齢、上限などを入力するフォーム
 */
export const Form: FC<Props> = ({ control, errors, register }) => (
  <Column>
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
        <option value="0">3-5歳</option>
        <option value="1">6-7歳</option>
        <option value="2">8-9歳</option>
        <option value="3">10-11歳</option>
        <option value="4">12-14歳</option>
        <option value="5">15-17歳</option>
        <option value="6">18-29歳</option>
        <option value="7">30-49歳</option>
        <option value="8">50-64歳</option>
        <option value="9">65-74歳</option>
        <option value="10">75歳以上</option>
      </select>
    </label>
    {errors.old && <p>{errors.old.message}</p>}
    <label>
      上限
      <input type="number" name="up_value" ref={register} />
    </label>
  </Column>
);
