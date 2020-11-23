import React from "react";
import styled from "styled-components";

export const Button = () => {
  return (
    <StyledButton>
      <span>PUSH！</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  overflow: hidden;
  padding: 1.5rem 6rem;
  color: #fff;
  border-radius: 0;
  background: #000;
  > span {
    position: relative;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-transform: translateX(-96%);
    transform: translateX(-96%);
    background: #eb6877;
  }
  &:hover:before {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
  }
`;
