import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { COLOR } from "../styles/colors";

export const Footer = () => {
  return (
    <StyledFooter>
      <p>
        {"Copyright © "}
        <br />
        <br />
        {"Created by "}
        <Link href="https://github.com/">Kthr3e</Link>
        {" & "}
        <Link href="https://github.com/NozomuTsuruta/">NozomuTsuruta</Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </p>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  margin-top: 100px;
  width: 100%;
  text-align: center;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.BLACK};
  padding: 5px;
  > p {
    margin: 30px 0;
  }
`;
