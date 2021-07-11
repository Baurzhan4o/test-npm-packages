<template>
  <v-text-field
    outlined
    :value="computedValue"
    :label="data.label"
    readonly
    color="primary"
  >

  </v-text-field>
</template>

<script>
export default {
  name: 'formObject',
  props: ['data'],
  computed: {
    computedValue() {
      return Object.values(this.data.value).join('; ');
    },
  },
};
</script>

<style scoped>

</style>
