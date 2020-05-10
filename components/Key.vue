<template>
  <v-col class="d-flex justify-center pa-1">
    <v-icon :color="keyColor" :class="keyColor" class="key">mdi-circle</v-icon>
  </v-col>
</template>

<script>
export default {
  name: 'Key',
  props: {
    keyColor: {
      type: String,
      require: true,
      default: ''
    }
  },
  mounted() {
    // console.log(`key.mounted: keyColor=${this.keyColor}`)
  }
}
</script>

<style>
.key {
  background-color: #000;
  font-size: 24px;
  border-radius: 50%;
  box-shadow: #666 -2px -2px 6px, inset #222 -10px -10px 10px !important;
}
.v-icon.v-icon {
  font-size: 22px;
}
</style>
