<template>
  <v-text-field
    outlined
    color="primary"
    readonly
    :value="data.value"
    :label="data.label"
  >

  </v-text-field>
</template>

<script>
export default {
  name: 'formText',
  props: ['data'],
};
</script>

<style scoped>

</style>
