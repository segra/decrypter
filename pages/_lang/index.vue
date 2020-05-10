<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <v-card>
        <v-card-text class="justify-center">
          <p class="text-center">
            {{ $t('home.intro') }}
          </p>
          <v-container text-center>
            <v-row>
              <v-col cols="12" class="py-2">
                <p class="title">{{ $t('home.mode') }}</p>

                <v-btn-toggle
                  v-model="mode"
                  block
                  mandatory
                  class="justify-center"
                >
                  <v-btn v-for="(item, i) in modes" :key="i">
                    <v-icon large class="mr-2" :color="item.color">{{
                      item.icon
                    }}</v-icon>
                    <span class="d-none d-sm-flex">{{ item.text }}</span>
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="py-2">
                <p class="title">{{ $t('home.level') }}</p>

                <v-btn-toggle
                  v-model="level"
                  mandatory
                  large
                  class="justify-center"
                >
                  <v-btn v-for="(item, i) in levels" :key="i">
                    <div class="subtitle-1">{{ item.title }}</div>
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex align-center justify-center flex-column">
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/game"
            class="mb-3"
            @click.native="newGame"
          >
            {{ $t('home.button') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      transition: 'bounce'
    }
  },
  computed: {
    modes() {
      return [
        {
          icon: 'mdi-circle',
          text: this.$t('home.mode1'),
          color: 'purple'
        },
        {
          icon: 'mdi-numeric-1-circle',
          text: this.$t('home.mode2'),
          color: 'white'
        },
        {
          icon: 'mdi-emoticon-happy',
          text: this.$t('home.mode3'),
          color: 'yellow'
        },
        {
          icon: 'mdi-basketball',
          text: this.$t('home.mode4'),
          color: 'orange'
        }
      ]
    },
    levels() {
      return [
        {
          title: this.$t('home.level1'),
          info: this.$t('home.level1')
        },
        {
          title: this.$t('home.level2'),
          info: this.$t('home.level2')
        },
        {
          title: this.$t('home.level3'),
          info: this.$t('home.level3')
        }
      ]
    },
    theme: {
      set(theme) {
        this.$store.commit('settings/SET_THEME', theme)
      },
      get() {
        return this.$store.state.settings.theme
      }
    },
    mode: {
      set(mode) {
        this.$store.commit('settings/SET_MODE', mode)
      },
      get() {
        return this.$store.state.settings.mode
      }
    },
    level: {
      set(level) {
        this.$store.commit('settings/SET_LEVEL', level)

        this.$store.commit('settings/SET_PEGS_LENGTH', parseInt(level) + 5)
        this.$store.commit('settings/SET_PEGS_SLOT_LENGTH', parseInt(level) + 3)
      },
      get() {
        return this.$store.state.settings.level
      }
    },
    duplicates: {
      set(duplicates) {
        this.$store.commit('settings/SET_DUPLICATES', duplicates)
      },
      get() {
        return this.$store.state.settings.duplicates
      }
    },
    blanks: {
      set(blanks) {
        this.$store.commit('settings/SET_BLANKS', blanks)
      },
      get() {
        return this.$store.state.settings.blanks
      }
    }
  },
  mounted() {
    if (localStorage.getItem('settings')) {
      try {
        this.settings = JSON.parse(localStorage.getItem('settings'))
      } catch (e) {
        localStorage.removeItem('settings')
      }
    }
  },
  methods: {
    saveSettings() {
      const parsed = JSON.stringify(this.settings)
      localStorage.setItem('settings', parsed)
    },
    newGame() {
      this.$store.commit('SET_GAME_IN_PROGRESS', false)
      console.log(
        `newGame(): isGameInProgress=${this.$store.state.isGameInProgress}`
      )
    }
  },
  head() {
    return { title: this.$t('home.title') }
  }
}
</script>
