<template>
  <div>
    <Beverage :isIced="currentTemp === 'Cold'" 
              :creamer="currentCreamer"
              :syrup="currentSyrup"
              :beverage="currentBaseBeverage"
    />
    <label for="name">Name:</label>
    <input id="name" v-model="name" type="text" />

    <button @click="makeBeverage">Make Beverage</button>
    <div v-for="(recipe, index) in store.recipes" :key="index">
      <h2>{{ recipe.name }}</h2>
      <p>Temperature: {{ recipe.temperature }}</p>
      <p>Creamer: {{ recipe.creamer }}</p>
      <p>Syrup: {{ recipe.syrup }}</p>
      <p>Base Beverage: {{ recipe.baseBeverage }}</p>
    </div>
    <ul>
      <li>
        Temperature: 
        <template v-for="temp in temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
      <li>
        Creamer:
        <template v-for="creamer in creamers" :key="creamer">
          <label>
            <input
              type="radio"
              name="creamer"
              :id="`r${creamer}`"
              :value="creamer"
              v-model="currentCreamer"
            />
            {{ creamer }}
          </label>
        </template>
      </li>
      <li>
        Syrup: 
        <template v-for="syrup in syrups" :key="syrup">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="`r${syrup}`"
              :value="syrup"
              v-model="currentSyrup"
            />
            {{ syrup }}
          </label>
        </template>
      </li>
      <li>
        Base Beverage:
        <template v-for="beverage in baseBeverages" :key="beverage">
          <label>
            <input
              type="radio"
              name="beverage"
              :id="`r${beverage}`"
              :value="beverage"
              v-model="currentBaseBeverage"
            />
            {{ beverage }}
          </label>
        </template>
      </li>
    </ul>
  </div>
  <div v-for="recipe in store.recipes" :key="recipe.name" @click="showBeverage(recipe)">
    {{ recipe.name }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useStore } from "./store";
import Beverage from "./components/Beverage.vue";
// Define reactive data
const name = ref('');
const store = useStore();
const temps = ref(["Hot", "Cold"]);
const currentTemp = ref("Hot");
const creamers = ref(["None", "Milk", "Cream", "Half & Half"]);
const currentCreamer = ref("Milk");
const syrups = ref(["None", "Vanilla", "Caramel", "Hazelnut"]);
const currentSyrup = ref("Vanilla");
const baseBeverages = ref(["Coffee", "Green Tea", "Black Tea"]);
const currentBaseBeverage = ref("Coffee");
onMounted(() => {
  store.$subscribe((mutation, state) => {
    if (mutation.type === 'patch object') {
      console.log('Patch object:', mutation.payload);
    }
  });
  store.$patch({
    name: name.value,
    temperature: currentTemp.value,
    creamer: currentCreamer.value,
    syrup: currentSyrup.value,
    baseBeverage: currentBaseBeverage.value
  });
});
const showBeverage = (recipe) => {
  currentTemp.value = recipe.temperature;
  currentCreamer.value = recipe.creamer;
  currentSyrup.value = recipe.syrup;
  currentBaseBeverage.value = recipe.baseBeverage;
};
const makeBeverage = () => {
  store.$patch({
    name: name.value,
    temperature: currentTemp.value,
    creamer: currentCreamer.value,
    syrup: currentSyrup.value,
    baseBeverage: currentBaseBeverage.value
  });
  store.addRecipe(name.value);
  name.value = '';
};

console.log(currentCreamer.value, currentSyrup.value, currentBaseBeverage.value)
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
</style>
