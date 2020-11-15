import { Checkbox } from "@material-ui/core";
import React from "react";
import { useSetRecoilState } from "recoil";
import { shop_state } from "../recoil";

export const SelectShop = () => {
  const set_shop = useSetRecoilState(shop_state);
  const shop_list = ["macdonalds", "dennys"];

  return (
    <>
      {shop_list.map((shop) => (
        <label key={shop}>
          <span>{shop}</span>
          <Checkbox
            onChange={() =>
              set_shop((prev) => {
                if (prev.includes(shop))
                  return prev.filter((el) => el !== shop);
                return [...prev, shop];
              })
            }
            defaultChecked={false}
          />
        </label>
      ))}
    </>
  );
};
