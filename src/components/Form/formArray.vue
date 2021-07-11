<template>
  <v-autocomplete
    multiple
    :value="data.value"
    :label="data.label"
    :items="data.value"
    outlined
    color="primary"
    chips
    readonly
  ></v-autocomplete>
</template>

<script>
export default {
  name: 'formArray',
  props: ['data'],
};
</script>

<style scoped>

</style>
