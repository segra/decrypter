<template>
  <div class="locale-switcher">
    <v-select
      v-model="$root.$i18n.locale"
      :items="locales"
      item-text="language"
      item-value="abbr"
      :label="$t('settings.language')"
      outlined
      @change="changeLanguage"
    ></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locales: [
        { language: 'English', abbr: 'en' },
        { language: 'French', abbr: 'fr' }
      ]
    }
  },
  methods: {
    changeLanguage(e) {
      this.$store.commit('SET_LANG', e)
    }
  }
}
</script>

<style></style>
