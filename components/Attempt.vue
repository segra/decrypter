<template>
  <v-row class="attempt align-center" :class="{ block: getBlock }">
    <!-- Peg Slots -->
    <v-col cols="10" class="pegs">
      <v-row>
        <v-col
          v-for="(peg, index) in pegSlotLength"
          :key="index"
          class="d-flex justify-center pa-0"
        >
          <peg
            :peg-index="guess[index]"
            :slot-index="index"
            @set-peg="setPeg"
          ></peg>
        </v-col>
      </v-row>
    </v-col>

    <!-- Enter Button -->
    <v-col cols="2" class="keys text-center">
      <template v-if="!isEntered">
        <v-btn
          :loading="isLoading"
          :disabled="!isValid"
          outlined
          fab
          small
          color="teal"
          alt="Enter code"
          title="Enter code"
          @click.prevent="enterCode"
        >
          <v-icon large>mdi-location-enter</v-icon>
        </v-btn>
      </template>

      <!-- Key Slots -->
      <template v-else>
        <transition-group
          appear
          name="fade-in"
          tag="v-row"
          :style="{ '--total': pegSlotLength }"
          class="row"
        >
          <key
            v-for="(key, index) in keys"
            :key="index"
            :style="{ '--i': index }"
            :key-color="key"
          ></key>
        </transition-group>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import Peg from '~/components/Peg'
import Key from '~/components/Key'

export default {
  components: {
    Peg,
    Key
  },
  props: {
    guess: {
      type: Array,
      require: true,
      default: () => []
    },
    block: {
      type: Boolean,
      require: false,
      default: false
    },
    pegIndex: {
      type: Number,
      require: false,
      default: 0
    }
  },
  data() {
    return {
      transition: 'bounce',
      isCodeLoading: false,
      isCodeValid: false,
      isCodeEntered: false,
      blockRow: false,
      code: null,
      keys: []
    }
  },
  computed: {
    ...mapState('settings', ['mode', 'level', 'pegSlotLength']),
    isValid() {
      return this.isCodeValid
    },
    isLoading() {
      return this.isCodeLoading
    },
    isEntered() {
      return this.isCodeEntered
    },
    getBlock() {
      return this.blockRow
    },
    currentCode() {
      return this.$store.state.currentCode
    }
  },
  created() {
    this.blockRow = this.block
    // console.log(`Attempt.created(): guess=${this.guess}`)
  },
  mounted() {
    // console.log(`Attempt.mounted(): guess=${this.guess}`)
    if (this.blockRow) {
      this.isCodeEntered = true
      this.code = this.guess
      this.addKeys()
    } else {
      this.initAttempt()
    }
  },
  methods: {
    initAttempt() {
      this.code = [...Array(this.pegSlotLength)]
    },
    setPeg(e) {
      // console.log(`setPeg(${JSON.stringify(e)}), slotIndex=${e.slotIndex}`)
      this.code[e.slotIndex] = e.pegIndex
      this.validateCode()
    },
    validateCode() {
      this.isCodeValid = !this.code.includes(undefined)
      // console.log(
      //   `validateCode(): this.code=${this.code}, isCodeValid=${this.isCodeValid}, ${this.code.length}, ${this.pegSlotLength}`
      // )
    },
    enterCode() {
      console.log(`Attempt.enterCode()`)
      this.isCodeLoading = !this.isCodeLoading
      this.blockRow = true

      this.addKeys()
      // ADD_ATTEMPT
      // Activate button loader
      setTimeout(() => {
        this.isCodeLoading = false
        this.isCodeEntered = true
      }, 2000)
    },
    addKeys() {
      // const code = this.code.map((item) => item.pegIndex)
      const gameCodeCopy = [...this.currentCode]
      const codeCopy = [...this.code]
      const codeLength = this.code.length

      // Check for correct peg in correct spot
      for (let i = 0; i < codeLength; i++) {
        if (this.code[i] === gameCodeCopy[i]) {
          this.keys.push('red--text')
          gameCodeCopy[i] = 'red'
          codeCopy[i] = 'red'
        }
      }
      console.log(`Attempt.addKeys() red Keys: gameCodeCopy=${gameCodeCopy}`)
      // Check for correct peg
      for (let i = 0; i < codeLength; i++) {
        if (!isNaN(codeCopy[i]) && gameCodeCopy.includes(codeCopy[i])) {
          this.keys.push('white--text')
          const idx = gameCodeCopy.indexOf(this.code[i])
          gameCodeCopy[idx] = 'white'
        }
      }
      // Fill in the rest of Keys Array with blanks if needed
      for (let i = 0; i < codeLength; i++) {
        if (this.keys[i] === undefined) this.keys.push('transparent--text')
      }

      console.log(
        `Attempt.addKeys(): gameCode=${this.currentCode}, guess=${this.code}, gameCodeCopy=${gameCodeCopy}`
      )
      this.checkCode()
    },
    checkCode() {
      // console.log(`Attempt.checkCode(): code=${this.code}`)
      const delayTime = 1000 * this.pegSlotLength

      setTimeout(() => {
        if (!this.block) this.$emit('check-code', this.code)
      }, delayTime)
    }
  }
}
</script>

<style lang="scss">
.block {
  pointer-events: none;
}

.fade-in {
  &-move {
    transition: opacity 0.5s linear, transform 0.5s ease-in-out;
  }

  &-leave-active {
    transition: opacity 0.4s linear,
      transform 0.4s cubic-bezier(0.5, 0, 0.7, 0.4); //cubic-bezier(.7,0,.7,1);
    transition-delay: calc(0.1s * (var(--total) - var(--i)));
  }

  &-enter-active {
    transition: opacity 0.5s linear,
      transform 0.5s cubic-bezier(0.2, 0.5, 0.1, 1);
    transition-delay: calc(0.5s * var(--i));
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    // transform: translateX(-1em);
  }
  &-leave-to {
    // transform: translateX(1em);
  }
}
</style>
