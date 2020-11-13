import { Card } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";
import Image from "next/image";

type Props = {
  name: string;
  img: string;
};

export const Menu: FC<Props> = ({ name, img }) => {
  return (
    <Card>
      <h1>{name}</h1>
      <Image width="100%" height="100%" src={img} />
    </Card>
  );
};

const StyledImage = styled(Image)`
    
`;