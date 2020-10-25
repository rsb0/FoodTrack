import { IFood } from "../models/food";
import { observable, action, runInAction } from "mobx";
import { createContext } from 'react';
import agent from "../api/agent";

class FoodStore {
    @observable foods: IFood[] = [];
    @observable food: IFood | null = null;
    @observable loadingInitial = false;
    @observable foodRegistry = new Map();

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
                runInAction("getting food", () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    }

    getFood = (id: string) => {
        return this.foodRegistry.get(id);
    }

    
}

export default createContext(new FoodStore());
