import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { IFood } from "../../../app/models/food";
import "../styles/foodStyles.css";
import { CardActionArea } from "@material-ui/core";
import imageURL from "../../../assets/categoryImages/oats.jpeg";

const FoodListItem: React.FC<{ food: IFood }> = ({ food }) => {
  return (
    <Card className="foodCard" variant="outlined">
      <CardActionArea>
        <CardMedia src={imageURL} component="img" title="Title" />
        <CardContent>
          <Typography
            className="FoodTitle"
            variant="h5"
            color="textPrimary"
            gutterBottom
          >
            {food.name} | {food.brand}
          </Typography>
          <Typography variant="body2" component="p">
            calories: {food.calories}
          </Typography>
          <Typography variant="body2" component="p">
            fat: {food.fat}
          </Typography>
          <Typography variant="body2" component="p">
            sugar: {food.sugar}
          </Typography>
          <Typography variant="body2" component="p">
            starch: {food.starch}
          </Typography>
          <Typography variant="body2" component="p">
            fiber: {food.fiber}
          </Typography>
          <Typography variant="body2" component="p">
            protein: {food.protein}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Button</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default FoodListItem;
