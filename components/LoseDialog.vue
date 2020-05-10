<template>
  <v-dialog v-model="show" max-width="450">
    <v-card>
      <v-card-title class="headline justify-center"
        >You have been locked out!</v-card-title
      >

      <v-card-text>
        You have exceeded the number of attempts to decrypt this code. Would you
        like to try and decrypt another code?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn to="/game" nuxt color="green darken-1" text @click="resetGame()">
          Yes
        </v-btn>

        <v-btn to="/" nuxt color="green darken-1" text @click="show = false">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    resetGame() {
      window.location.reload(true)
      this.$emit('init-game')
      this.show = false
    }
  }
}
</script>
<style></style>
