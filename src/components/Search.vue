<template>
  <v-text-field placeholder="Поиск"
                rounded
                outlined
                dense
                full-width
                v-model="packageName"
                :loading="loading"
                @keydown.enter="search"
                color="primary">
    <template #append>
      <v-row justify="space-between" class="flex-nowrap" dense>
        <v-btn fab text
               v-show="packageName"
               @click="clear"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-divider vertical inset/>
        <v-btn fab text
               @click="search"
        >
          <v-icon>
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-text-field>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      packageName: null,
    };
  },
  computed: {
    ...mapGetters([
      'loading',
    ]),
  },
  methods: {
    search() {
      this.$store.dispatch('search', {
        packageName: this.packageName,
      });
    },
    clear() {
      this.packageName = null;
      this.$store.dispatch('clear');
    },
  },
};
</script>

<style scoped>

</style>
