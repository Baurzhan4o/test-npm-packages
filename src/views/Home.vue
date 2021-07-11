<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" lg="8" md="8" sm="8" style="margin-top: 100px">
        <fr-search></fr-search>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-10">
      <v-col cols="12">
        <v-data-table :headers="headers" :items="hits"
                      :server-items-length="nbHits"
                      @pagination="pagination"
                      :loading="loading"
                      @click:row="handleRowClick"
        >
          <template #item.created="{item}">
            <span> {{ new Date(item.created).toLocaleDateString() }}</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <Dialog :visible="dialogVisible" v-if="dialogVisible" :name="name"
            @closed="dialogVisible = false"
    />
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex';
import Dialog from '@/components/Dialog.vue';

export default {
  name: 'Home',
  components: { Dialog },
  data() {
    return {
      headers: [
        {
          sortable: false, text: 'Наименование', value: 'name', width: '200px',
        },
        {
          sortable: false, text: 'Версия', value: 'version', width: '50px',
        },
        {
          sortable: false, text: 'Автор', value: 'owner.name', width: '100px',
        },
        {
          sortable: false, text: 'Дата', value: 'created', width: '70',
        },
        {
          sortable: false, text: 'Описание', value: 'description', width: '500px',
        },
      ],
      currentPage: 1,
      dialogVisible: false,
      name: '',
    };
  },
  computed: {
    ...mapGetters([
      'hits',
      'page',
      'nbPages',
      'nbHits',
      'packageName',
      'loading',
    ]),
  },
  methods: {
    pagination(options) {
      if (this.packageName) {
        this.$store.dispatch('search', {
          packageName: this.packageName, page: options.page,
        });
      }
    },
    handleRowClick(row) {
      this.dialogVisible = true;
      this.name = row.name;
    },
  },
};
</script>

<style lang="scss">
.v-input__append-inner {
  margin-top: 0 !important;
}

</style>
