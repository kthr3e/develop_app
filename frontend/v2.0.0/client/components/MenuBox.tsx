import React, { FC } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme, AppBar, Tabs, Tab, Box } from "@material-ui/core";

type Props = {
  dir?: string;
  index: number;
  value: number;
};

const TabPanel: FC<Props> = ({ dir, index, value, children }) => (
  <div
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    dir={dir}>
    {value === index && (
      <div>
        <h1>{children}</h1>
      </div>
    )}
  </div>
);

export const MenuBox = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
          <TabPanel value={value} index={i} dir={theme.direction} key={label}>
            {label}
          </TabPanel>
        ))}
      </SwipeableViews>
    </>
  );
};
