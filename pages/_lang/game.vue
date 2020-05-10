<template>
  <v-row>
    <v-col cols="12">
      <v-card class="px-4 game-card">
        <transition-group v-if="gameIsReady" name="attempts" appear>
          <attempt
            v-for="(attempt, index) in allAttempts"
            :key="index"
            :guess="attempt"
            :block="index + 1 != attemptsCount"
            :peg-index="index + 1"
            @check-code="checkCode"
          ></attempt>
        </transition-group>
      </v-card>
    </v-col>
    <WinDialog v-model="showWinDialog" @init-game="initGame" />
    <LoseDialog v-model="showLoseDialog" @init-game="initGame" />
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WinDialog from '~/components/WinDialog.vue'
import LoseDialog from '~/components/LoseDialog.vue'

export default {
  components: {
    WinDialog,
    LoseDialog
  },
  data() {
    return {
      transition: 'bounce',
      gameIsReady: false,
      isCodeMatch: false,
      showWinDialog: false,
      showLoseDialog: false
    }
  },
  computed: {
    ...mapState('settings', [
      'mode',
      'level',
      'pegsLength',
      'pegSlotLength',
      'isGameInProgress'
    ]),
    ...mapState('attempts', ['attempts', 'attemptsCount']),
    attemptsMax() {
      return this.$store.state.attempts.attemptsMax
    },
    gameMode() {
      return this.$store.state.gameModes[this.mode]
    },
    gameInProgress() {
      return this.$store.state.isGameInProgress
    },
    currentCode() {
      return this.$store.state.currentCode
    },
    allAttempts() {
      return this.$store.state.attempts.attempts
    },
    attemptsCount() {
      return this.$store.state.attempts.attemptsCount
    }
  },
  mounted() {
    console.log(
      `game.mounted(): gameInProgress=${this.gameInProgress}, allAttempts=${this.allAttempts}`
    )
    !this.$store.state.isGameInProgress ? this.initGame() : this.resumeGame()
  },
  methods: {
    ...mapActions('attempts', ['addAttempt', 'setAttempt', 'resetAttempts']),

    initGame() {
      console.log(
        `game.initGame(): mode=${this.mode}, level=${this.level}, pegsLength=${this.pegsLength}, pegSlotLength=${this.pegSlotLength}`
      )
      this.$store.commit('SET_GAME_IN_PROGRESS', true)
      this.resetAttempts()
      this.setGameCode()
      this.addAttempt()
      this.gameIsReady = true
    },

    resumeGame() {
      console.log(`game.resumeGame(): time to rehydrate!`)
      this.gameIsReady = true
      if (this.attemptsCount === this.attemptsMax) {
        this.checkGame(false)
      }
    },

    setGameCode() {
      const gameCode = []
      for (let i = 0; i < this.pegSlotLength; i++) {
        const code = this.getRandomCode()
        // write code to check for duplicates if !settings/duplicates
        gameCode[i] = code
      }
      this.$store.commit('SET_CURRENT_CODE', gameCode)

      console.log(`game.setGameCode() = ${gameCode}`)
    },

    getRandomCode() {
      return Math.floor(Math.random() * (this.pegsLength - 1))
    },

    checkCode(evt) {
      const code = evt
      console.log(
        `game.checkCode(${JSON.stringify(evt)}) = code=${code}, currentCode=${
          this.currentCode
        }, attemptsCount=${this.attemptsCount}, attemptsMax=${this.attemptsMax}`
      )

      if (this.attemptsCount <= this.attemptsMax) {
        this.setAttempt(code)
        this.isCodeMatch = this.codeMatch(code, this.currentCode)
        this.isCodeMatch ? this.checkGame(this.isCodeMatch) : this.addAttempt()
      } else if (!this.isCodeMatch || this.attemptsCount === this.attemptsMax) {
        this.checkGame(false)
      }
    },
    codeMatch(arr1, arr2) {
      console.log(`game.codeMatch(${arr1}, ${arr2})`)
      // Check if the arrays are the same length
      if (arr1.length !== arr2.length) return false

      // Check if all items exist and are in the same order
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
      }

      // Otherwise,
      return true
    },
    checkGame(isCodeMatch) {
      console.log(`game.checkGame(${isCodeMatch})`)
      this.$store.commit('SET_GAME_IN_PROGRESS', false)

      if (isCodeMatch) {
        this.showWinDialog = true
      } else if (this.attemptsCount >= this.attemptsMax) {
        this.showLoseDialog = true
      }
    }
  },
  head() {
    return { title: this.$t('home.title') }
  }
}
</script>

<style>
.game-card {
  transition: all 1s;
}
.attempts-enter-active,
.attempts-leave-active {
  transition: all 1s;
}
.attempts-enter,
.attempts-leave-to {
  opacity: 0;
}
.attempts-move {
  transition: transform 1s;
}
</style>
