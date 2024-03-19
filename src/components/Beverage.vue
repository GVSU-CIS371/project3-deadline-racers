<template>
  <Mug>
    <!-- Display both creamer and syrup are "None" -->
    <Base :name="beverage" v-if="creamer === 'None' && syrup === 'None'" />
    
    <!-- Display The syrup is "None" but creamer is not -->
    <Base :name="beverage" v-else-if="creamer !== 'None' && syrup === 'None'" />
    <Creamer :name="creamer" v-else />
    
    <!-- Display syrup -->
    <Syrup :name="syrup" v-if="syrup !== 'None'" />
  </Mug>
</template>
<script setup lang="ts">
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";

type Props = {
  isIced: boolean;
  creamer: string;
  syrup: string;
  beverage: string;
};
defineProps<Props>();
</script>
