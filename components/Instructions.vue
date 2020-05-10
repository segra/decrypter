<template>
  <v-dialog v-model="show" max-width="600">
    <v-card>
      <v-card-title class="headline">{{
        $t('instructions.title')
      }}</v-card-title>

      <v-card-text>
        <p><span v-html="$t('instructions.text')"></span></p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" text @click.stop="show = false">
          {{ $t('instructions.button') }}
          <!-- "You have 10 attempts to break the code/password There are 4 code
          slots with 6 available peg colors/icons Use must guess the correct
          color and position for each of the 4 slots feedback is presented by
          four key pegs in the small holes of the row with the guess. A
          colored or black key peg is placed for each code peg from the guess
          which is correct in both color and position. A white key peg
          indicates the existence of a correct color code peg placed in the
          wrong position Duplicates are allowed No blanks." -->
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
  }
}
</script>
