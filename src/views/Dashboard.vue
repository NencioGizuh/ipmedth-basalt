<template>
    <div>
        Dashboard
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            
        }
    },
    created() {
        this.$store.dispatch('setDefaultAppbar');
    }
}
</script>

<style lang="scss">

</style>