import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid, GridColumn } from "semantic-ui-react";
import { IFood } from "../../../app/models/food";
import FoodStore from "../../../app/stores/foodStore";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

const FoodForm: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
  history,
}) => {
  const foodStore = useContext(FoodStore);
  const {
    createFood,
    submitting,
    food: initialFormState,
    loadFood,
    clearFood,
  } = foodStore;

  const [food, setFood] = useState<IFood>({
    id: "",
    name: "",
    brand: "",
    calories: 0,
    protein: 0,
    fat: 0,
    sugar: 0,
    starch: 0,
    fiber: 0,
  });

  useEffect(() => {
    if (match.params.id && food.id.length === 0) {
      loadFood(match.params.id).then(
        () => initialFormState && setFood(initialFormState)
      );
    }
    return () => {
      clearFood();
    };
  }, [loadFood, clearFood, match.params.id, initialFormState, food.id.length]);

  const handleSubmit = () => {
    if (food.id.length === 0) {
      let newFood = {
        ...food,
        id: uuid(),
      };
      createFood(newFood).then(() => history.push(`/foods`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (name === "name" || name === "brand") {
      setFood({ ...food, [name]: value });
    } else {
      setFood({ ...food, [name]: parseFloat(value) });
    }
  };

  return (
    <Grid>
      <GridColumn width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name="name"
              placeholder="Name"
              value={food.name}
            />
            <Form.TextArea
              name="brand"
              onChange={handleInputChange}
              placeholder="Brand"
              value={food.brand}
            />
            <Form.Input
              name="calories"
              onChange={handleInputChange}
              label="Calories"
              value={food.calories}
            />
            <Form.Input
              name="protein"
              onChange={handleInputChange}
              label="Protein"
              value={food.protein}
            />
            <Form.Input
              name="fat"
              onChange={handleInputChange}
              label="Fat"
              value={food.fat}
            />
            <Form.Input
              name="sugar"
              onChange={handleInputChange}
              label="Sugar"
              value={food.sugar}
            />
            <Form.Input
              name="starch"
              onChange={handleInputChange}
              label="Starch"
              value={food.starch}
            />
            <Form.Input
              name="fiber"
              onChange={handleInputChange}
              label="Fiber"
              value={food.fiber}
            />
            <Button
              loading={submitting}
              floated="left"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              onClick={() => history.push("/foods")}
              floated="left"
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(FoodForm);
