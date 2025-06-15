<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="main bg-dark">
    <RouterView/>
  </div>
 
</template>
<style scoped>
.main{
  
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

