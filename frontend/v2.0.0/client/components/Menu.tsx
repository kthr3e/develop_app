import React, { useEffect, useState } from "react";
import { MenuList } from "./MenuList";
import styled from "styled-components";
import { mac_menu } from "../util/MacMenu";
import { dennys_menu } from "../util/DennysMenu";
import { COLOR } from "../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const Menu = () => {
  const [active, set_active] = useState(0);
  const [page, set_page] = useState(1);

  useEffect(() => {
    set_page(1);
  }, [active]);

  const shop_list = [
    {
      id: 0,
      name: "マクドナルド",
      menu: mac_menu,
    },
    {
      id: 1,
      name: "デニーズ",
      menu: dennys_menu,
    },
  ];

  return (
    <>
      <Tabs>
        {shop_list.map(({ name, id }) => (
          <Tab onClick={() => set_active(id)} active={active === id} key={id}>
            {name}
          </Tab>
        ))}
      </Tabs>
      <Container>
        <IconButton
          css={`
            left: 0;
          `}
          disabled={page === 1}
          onClick={() => set_page((prev) => prev - 1)}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </IconButton>
        {shop_list.map(({ id, menu }) => (
          <Content active={active === id} key={id}>
            <MenuList menu={menu} page={page} />
          </Content>
        ))}
        <IconButton
          css={`
            right: 0;
          `}
          disabled={page === shop_list[active].menu.length}
          onClick={() => set_page((prev) => prev + 1)}>
          <FontAwesomeIcon icon={faAngleRight} />
        </IconButton>
      </Container>
      <p>{`${page}/${shop_list[active].menu.length}`}</p>
    </>
  );
};

const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  height: 3em;
`;

const Tab = styled.button<{ active: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  width: 50%;
  position: relative;
  font-size: 1em;
  ${({ active }) =>
    active
      ? `
    border: 1px solid #ccc;
    border-bottom: none;
    background-color: white;
    height: 30px;
  `
      : `
    height: 26px;
    top: 4px;
  `}
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;

const Content = styled.div<{ active: boolean }>`
  width: 90%;
  margin: 0 auto;
  ${({ active }) => !active && "display: none"}
`;

const IconButton = styled.button<{ disabled: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.BLACK};
  color: ${COLOR.WHITE};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  outline: none;
  position: absolute;
  top: calc(50% - 25px);
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.3;
    cursor: not-allowed;
  `}
`;

const Container = styled.div`
  position: relative;
`;
