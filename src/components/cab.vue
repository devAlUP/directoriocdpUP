<script >
export default{
  name:'cab'
}
</script>

<template>
  <nav>
    <img src="../assets/logo.png" alt="">
    <h1 class="text-light"> Un proposito</h1>


  </nav>
  
</template>

<style scoped>
nav{
  width: 100%;
  height: 11vh;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  

}
nav img{
  margin-top: 1rem;
  height: 9vh;
}

@media (max-width: 1024px) {
  nav h1{
    display: none;
   
  }
 
  
  }

</style>
