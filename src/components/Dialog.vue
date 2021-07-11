<template>
  <v-dialog v-model="visible" @click:outside="closeDialog"
            width="60%"
  >
    <v-card :loading="loading">
      <v-card-title>
        <p> {{name}}</p>
        <v-btn absolute right fab text @click="closeDialog">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text v-if="!loading">
        <v-row>
          <v-col cols="3">
            <v-img v-if="info.owner.avatar" contain :src="info.owner.avatar"></v-img>
          </v-col>
          <v-col cols="9">
            <component v-for="(form, index) in forms" :key="index"
                       :is="componentHandler(form)"
                       :data="form"
            >

            </component>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { getByName } from '@/plugins/algoliasearch';
import * as formComponents from '@/components/Form/index';

export default {
  name: 'Dialog',
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
    name: {
      default: '',
      type: String,
    },
  },
  components: {
    ...formComponents,
  },
  data() {
    return {
      info: {},
      labels: {
        description: 'Описание',
        downloadsLast30Days: 'Скачано за последние 30 дней',
        isDeprecated: 'Устарел',
        keywords: 'Ключевые слова',
        originalAuthor: 'Автор',
        readme: 'ReadMe',
        version: 'Версия',
      },
      loading: true,
      forms: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getByName(this.name).then((res) => {
        this.info = { ...res };
        this.buildForms();
      }).finally(() => {
        this.loading = false;
      });
    },
    buildForms() {
      Object.entries(this.info).forEach(([key, value]) => {
        if (Object.keys(this.labels).includes(key)) {
          this.forms.push({
            label: this.labels[key],
            value,
            key,
          });
        }
      });
    },
    componentHandler(form) {
      if (Array.isArray(form.value)) {
        return 'formArray';
      }
      if (typeof form.value === 'object' && form.value !== null) {
        return 'formObject';
      }
      return 'formText';
    },
    closeDialog() {
      Object.assign(this.info, {});
      this.forms = [];
      this.$emit('closed');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
