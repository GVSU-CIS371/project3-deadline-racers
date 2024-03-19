<template>
  <div class="baseBeverage" :style="{ backgroundColor: baseBeverageColor }"></div>
</template>

<script setup lang="ts">

  import { computed } from "vue";

  type Prop = {
    name: string;
  };

  type BaseBeverage = {
    name: string;
    color: string;
  };

  const Bases: BaseBeverage[] = [
    {
      name: "Black Tea",
      color: "#8B4513",
    },
    {
      name: "Green Tea",
      color: "#C8E6C9",
    },
    {
      name: "Coffee",
      color: "#6F4E37",
    },
  ];

  const props = withDefaults(defineProps<Prop>(), {
    name: "Black Tea",
  });

  // Compute the base beverage color based on the selected name
  const baseBeverageColor = computed(() => {
    const selectedBase = Bases.find(base => base.name === props.name);
    return selectedBase?.color;
  });
</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  animation: pour-tea 2s;
  z-index: 300;
}
</style>
