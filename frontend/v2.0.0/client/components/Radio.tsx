import {
  faAddressBook,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import React, { FC } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormContext } from "react-hook-form";

type Props = {
  name?: string;
  icon: IconDefinition;
  label: string;
  register?: any;
};

export const Radio: FC<Props> = ({ name, icon, label, register }) => {
  return (
    <InputContainer>
      <RadioButton type="radio" name={name} ref={register} />
      <RadioTile>
        <FontAwesomeIcon icon={icon} />
        <RadioLabel>{label}</RadioLabel>
      </RadioTile>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  height: 7rem;
  width: 7rem;
  margin: 0.5rem;
  &:checked {
    color: white;
    transform: scale(1.1, 1.1);
    background-color: black;
  }
`;

const RadioButton = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  cursor: pointer;
`;

const RadioTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  border-radius: 5px;
  padding: 1rem;
  transition: transform 300ms ease;
`;

const RadioLabel = styled.label`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: black;
`;
