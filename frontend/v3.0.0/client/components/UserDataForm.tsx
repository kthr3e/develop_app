import {
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { menu_value, ResultType, result_value } from "../recoil";
import { Row } from "../styles/common";
import { old_options } from "../util/OldOptions";

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
  const menu = useRecoilValue(menu_value);
  const set_result_value = useSetRecoilState<ResultType>(result_value);

  const on_submit = async (data: FormData) => {
    console.log(data);
    try {
      data["shop"] = ["macdonalds", "dennys"];
      if (menu.length > 0) {
        data["menu"] = menu;
      }
      const res = await Axios.post("http://localhost:5000/api/check", {
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
    <Form onSubmit={handleSubmit(on_submit)}>
      <InputLabel>
        性別
        <Controller
          as={
            <RadioGroup>
              <Row>
                <FormControlLabel
                  value="0"
                  control={<Radio color="primary" />}
                  label="男性"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="女性"
                  defaultValue=""
                />
              </Row>
            </RadioGroup>
          }
          name="gender"
          control={control}
        />
      </InputLabel>
      <InputLabel>
        年齢
        <Controller
          as={
            <Select error={"old" in errors} fullWidth defaultValue="">
              {old_options.map(({ value, text }) => (
                <MenuItem key={value} value={value}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          }
          name="old"
          control={control}
        />
      </InputLabel>
      <TextField
        label="上限"
        type="number"
        name="up_value"
        margin="dense"
        inputRef={register}
        inputProps={{ min: 0 }}
      />
      <Button color="primary" variant="contained" type="submit">
        診断する
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;
