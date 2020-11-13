import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme, AppBar, Tabs, Tab } from "@material-ui/core";
import { MenuList } from "./MenuList";
import styled from "styled-components";

export const Menu = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handle_change = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handle_change_index = (index: number) => {
    setValue(index);
  };

  const labels = ["マクドナルド", "デニーズ"];

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handle_change} variant="fullWidth">
          {labels.map((label, i) => (
            <Tab label={label} aria-controls={`tabpanel-${i}`} key={label} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handle_change_index}>
        {labels.map((label, i) => (
          <MenuList
            key={label}
            value={value}
            index={i}
            dir={theme.direction}
            label={label}
          />
        ))}
      </SwipeableViews>
    </>
  );
};
