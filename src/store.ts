import { defineStore } from 'pinia';

type Recipe = {
    name: string;
    temperature: string;
    creamer: string;
    syrup: string;
    baseBeverage: string;
  };

export const useStore = defineStore({
  id: 'main',
state: () => ({
    name: '',
    temperature: 'Hot',
    creamer: 'None',
    syrup: 'None',
    baseBeverage: 'Coffee',
    recipes: [] as Recipe[]
}),
  actions: {
    setTemperature(temp: string) {
        this.temperature = temp;
    },
    setCreamer(creamer: string) {
        this.creamer = creamer;
    },
    setSyrup(syrup: string) {
        this.syrup = syrup;
    },
    setBaseBeverage(beverage: string) {
        this.baseBeverage = beverage;
    },
    addRecipe(name: string) {
      this.recipes.push({
        name,
        temperature: this.temperature,
        creamer: this.creamer,
        syrup: this.syrup,
        baseBeverage: this.baseBeverage
      } as Recipe); // Explicitly define the type of the object being pushed
    }
  }
});