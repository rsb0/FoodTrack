import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import { observer } from "mobx-react-lite";
import FoodStore from "../../../app/stores/foodStore";
import FoodListItem from "./FoodListItem";

const FoodList: React.FC = () => {
  const foodStore = useContext(FoodStore);
  const { foodsAlphabetically } = foodStore;

  return (
    <>
      {foodsAlphabetically.map((food) => (
        <FoodListItem key={food.id} food={food} />
      ))}
    </>
  );
};

export default observer(FoodList);
