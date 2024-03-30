<template>
  <div class="content">
    <Beverage :isIced="currentTemp === 'Cold'" 
              :creamer="currentCreamer"
              :syrup="currentSyrup"
              :beverage="currentBaseBeverage"
    />
    <div class="user-input">
      <label for="text">
        <input id="text" v-model="name" type="text" />
      </label>
      <button @click="makeBeverage">Make Beverage</button>
    </div>
    <div class="user-input-options">
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
    <h3>Saved Beverages:</h3>
    <div class="saved-beverages-box">
      <div class="saved-beverages">
        <label v-for="(recipe, index) in store.recipes" :key="index">
          <input
            type="radio"
            name="selectedRecipe"
            :value="index"
            v-model="selectedRecipeIndex"
          />
          {{ recipe.name }}
        </label>
      </div>
      
      <div v-if="selectedRecipeIndex !== null">
        <br/>
        <span><strong>Ingredients: </strong> </span>
        <span> {{ store.recipes[selectedRecipeIndex].temperature }} 
            {{ store.recipes[selectedRecipeIndex].creamer }}
            {{ store.recipes[selectedRecipeIndex].syrup }}
            {{ store.recipes[selectedRecipeIndex].baseBeverage }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { onMounted } from "vue";
import { useStore } from "./store";
import Beverage from "./components/Beverage.vue";
// Define reactive data
const name = ref('');
const store = useStore();
const selectedRecipeIndex = ref<number | null>(null);
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

watch(selectedRecipeIndex, (newValue) => {
    if (newValue !== null) {
      const selectedRecipe = store.recipes[newValue];
      currentTemp.value = selectedRecipe.temperature;
      currentCreamer.value = selectedRecipe.creamer;
      currentSyrup.value = selectedRecipe.syrup;
      currentBaseBeverage.value = selectedRecipe.baseBeverage;
    }
  });

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
.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .user-input{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    button{
      background-color: wheat;
      width: 8rem;
      height: 2rem;
      border-radius: 5px;
      border: none;
    }
    input{
      height: 1.8rem;
      border-radius: 5px;
      border: none;
    }
  }
  .user-input-options{
    padding-right: 1.5rem;
  }
  .saved-beverages-box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .saved-beverages{
      display: flex;
    }
  }
}
</style>