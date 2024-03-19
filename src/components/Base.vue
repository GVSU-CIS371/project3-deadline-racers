<template>
  <div :style="dynamicStyle" class="baseBeverage"></div>
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

  const dynamicStyle = computed(() => {
    const base = Bases.find((base) => base.name === props.name);
    return {
      backgroundColor: base?.color,
    };
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
