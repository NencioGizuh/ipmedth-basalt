<template>
  <div>
      AirConcentration
      {{ $route.params.name_of_city }}
      {{ $route.params.name_of_concentration }}
  </div>
</template>

<script>
export default {
    name: "AirConcentration",
    data() {
        return {
            
        }
    }
}
</script>

<style lang="scss">

</style>