<template>
  <div class="froth">
    <div :style="dynamicStyle" v-for=" in 5" class="foam"></div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useStore } from "../store";
  const store = useStore();
  const creamer = computed(() => store.baseBeverage);

  type Prop = {
    name: string;
  };
  type Creamer = {
    name: string;
    color: string;
  };
  
  const Creamers: Creamer[] = [
    {
      name: "Milk",
      color: "AliceBlue",
    },
    {
      name: "Cream",
      color: "#F5F5DC",
    },
    {
      name: "Half & Half",
      color: "#FFFACD",
    },
  ];


  const props = withDefaults(defineProps<Prop>(), {
    name: "Milk",
  });
  
  const dynamicStyle = computed(() => {
    const creamer = Creamers.find((creamer) => creamer.name === props.name);
    return {
      background: creamer?.color,
    };
  });

</script>

<style lang="scss" scoped>
  .froth {
    overflow: visible;
    transform: translateY(400%);
    position: relative;
    height: 20%;
    width: 100%;
    background-color: #c6c6c6;
    animation: pour-tea 2s 2s forwards;
  }
  .foam {
    display: block;
    background: #e4e0d2;
    border-radius: 30px;
    height: 40px;
    width: 40px;
    position: absolute;
  }

  .foam:nth-child(1) {
    top: 0px;
    left: -3px;
  }

  .foam:nth-child(2) {
    top: 0px;
    left: 55px;
  }

  .foam:nth-child(3) {
    width: 30px;
    height: 30px;
    border-radius: 40px;
    top: 3px;
    left: 30px;
  }

  .foam:nth-child(4) {
    width: 30px;
    height: 30px;
    border-radius: 45px;
    top: 5px;
    right: -2px;
  }

  .foam:nth-child(5) {
    top: 2px;
    right: 10px;
  }
</style>
