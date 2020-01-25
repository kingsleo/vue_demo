<template>
    <div>
      About
      {{msg}}
      <input/>
    </div>
</template>

<script>
    export default {
        name: 'About',
        props: {
            msg: String
        }
    }
</script>

<style scoped>

</style>
