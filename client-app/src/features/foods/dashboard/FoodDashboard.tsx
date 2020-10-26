import React, { useContext, useEffect } from "react";
import FoodStore from "../../../app/stores/foodStore";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import Grid from "@material-ui/core/Grid";
import FoodList from "./FoodList";
import "../styles/foodStyles.css";

const FoodDashboard: React.FC = () => {
  const foodStore = useContext(FoodStore);

  useEffect(() => {
    foodStore.loadFoods();
  }, [foodStore]);

  if (foodStore.loadingInitial)
    return <LoadingComponent content="Loading Foods..." />;

  return (
    <Grid container className="foodDashboardContainer">
      <Grid item className="FoodListGridItem">
        <FoodList />
      </Grid>
    </Grid>
  );
};

export default observer(FoodDashboard);
