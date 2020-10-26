import { IFood } from "../models/food";
import { observable, action, runInAction, computed } from "mobx";
import { createContext } from 'react';
import agent from "../api/agent";

class FoodStore {
    @observable foods: IFood[] = [];
    @observable food: IFood | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable foodRegistry = new Map();

    @computed get foodsAlphabetically() {
        return this.sortFoodsAlphabetically(
            Array.from(this.foodRegistry.values())
        );
    }

    sortFoodsAlphabetically(foods: IFood[]) {
        const sortedFoods = foods.sort((a, b) => a.name.localeCompare(b.name))
        return sortedFoods;
    }

    @action loadFoods = async () => {
        this.loadingInitial = true;
        try {
            const foods = await agent.Foods.list();
            runInAction("loading foods", () => {
            foods.forEach((food) => {
                this.foods.push(food);
                this.foodRegistry.set(food.id, food);
            });
            this.loadingInitial = false;
            });
        } catch (error) {
            runInAction("Loading foods error", () => {
            this.loadingInitial = false;
            });
            console.log(error);
        }
    };

    @action loadFood = async (id: string) => {
        let food = this.getFood(id);
        if (food) {
            this.food = food;
        } else {
            this.loadingInitial = true;
            try{
                food = await agent.Foods.details(id);
                runInAction("Getting food", () => {
                    this.food = food;
                    this.loadingInitial = false;
                });
            } catch (error) {
                runInAction("getting food error", () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    }

    getFood = (id: string) => {
        return this.foodRegistry.get(id);
    };

    @action clearFood = () => {
        this.food = null;
    };

    @action createFood = async (food: IFood) => {
        this.submitting = true;
        try {
            await agent.Foods.create(food);
            runInAction("creatign food", () => {
                this.foodRegistry.set(food.id, food);
                this.submitting = false;
            });
        } catch (error) {
            runInAction("create food error", () => {
                this.submitting = false;
            });
            console.log(error);
        }
    };

    @action editFood = async (food: IFood) => {
        this.submitting = true;
        try {
          await agent.Foods.update(food);
          runInAction("editing food", () => {
            this.foodRegistry.set(food.id, food);
            this.food = food;
            this.submitting = false;
          });
        } catch (error) {
          runInAction("editing food error", () => {
            this.submitting = false;
          });
          console.log(error);
        }
      };
    
}

export default createContext(new FoodStore());
