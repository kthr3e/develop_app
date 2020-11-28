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
      <IconButton
        disabled={page === 1}
        onClick={() => set_page((prev) => prev - 1)}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </IconButton>
      <Tabs>
        {shop_list.map(({ name, id }) => (
          <Tab onClick={() => set_active(id)} active={active === id} key={id}>
            {name}
          </Tab>
        ))}
      </Tabs>
      {shop_list.map(({ id, menu }) => (
        <Content active={active === id} key={id}>
          <MenuList menu={menu} page={page} />
        </Content>
      ))}
      <p>{`${page}/${shop_list[active].menu.length}`}</p>
      <IconButton
        disabled={page === shop_list[active].menu.length}
        onClick={() => set_page((prev) => prev + 1)}>
        <FontAwesomeIcon icon={faAngleRight} />
      </IconButton>
    </>
  );
};

const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
`;

const Tab = styled.button<{ active: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  width: 40%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) => (props.active ? "white" : "lightgray")};
  height: ${(props) => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;
const Content = styled.div<{ active: boolean }>`
  ${(props) => !props.active && "display:none"}
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.BLACK};
  color: ${COLOR.WHITE};
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
