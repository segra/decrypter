/* eslint-disable vue/valid-v-model */
<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title class="text-uppercase" v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="rightDrawer" absolute right>
      <v-list flat subheader>
        <v-list-item>
          <v-list-item-title>{{ $t('settings.title') }}</v-list-item-title>
        </v-list-item>

        <v-subheader>{{ $t('settings.subheading1') }}</v-subheader>
        <!-- Locale Switcher -->
        <v-list-item class="mb-3">
          <locale-switcher></locale-switcher>
        </v-list-item>

        <v-list-item class="mb-3">
          <v-switch
            v-model="$vuetify.theme.dark"
            hide-details
            inset
            :label="$t('settings.theme')"
            @change="switchTheme"
          ></v-switch>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item-group multiple>
          <v-subheader>{{ $t('settings.subheading2') }}</v-subheader>

          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="duplicates" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $t('settings.label1') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-bottom-navigation grow color="#03dac6">
      <v-btn to="/" nuxt>
        <span>{{ $t('links.home') }}</span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>

      <v-btn to="/game" nuxt>
        <span>{{ $t('links.game') }}</span>
        <v-icon>mdi-gamepad-circle-outline</v-icon>
      </v-btn>

      <v-btn
        :input-value="showInstructions"
        @click.stop="showInstructions = true"
      >
        <span>{{ $t('instructions.title') }}</span>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <Instructions v-model="showInstructions" />
  </v-app>
</template>

<script>
import LocaleSwitcher from '~/components/LocaleSwitcher'
import Instructions from '~/components/Instructions'

export default {
  components: {
    LocaleSwitcher,
    Instructions
  },
  data() {
    return {
      pages: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Game',
          to: '/game'
        }
      ],
      rightDrawer: false,
      showInstructions: false
    }
  },
  computed: {
    title() {
      return this.$t('home.title')
    },
    theme: {
      get() {
        return this.$store.state.settings.theme
      },
      set(theme) {
        this.$store.commit('settings/SET_THEME', theme)
      }
    },
    duplicates: {
      get() {
        return this.$store.state.settings.duplicates
      },
      set(duplicates) {
        this.$store.commit('settings/SET_DUPLICATES', duplicates)
      }
    }
  },
  methods: {
    switchTheme(e) {
      this.$store.commit('settings/SET_THEME', e)
    }
  },
  head() {
    return { title: this.title }
  }
}
</script>
