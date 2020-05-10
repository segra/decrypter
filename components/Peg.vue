<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      class="vmenu"
      open-on-hover
      close-on-content-click
      transition="slide-y-transition"
      top
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn class="peg-btn" fab small dark v-on="on" @mouseover="pegHover">
          <v-icon :color="getPeg.color">{{ getPeg.icon }}</v-icon>
        </v-btn>
      </template>

      <v-card class="pa-2 peg-menu">
        <v-btn
          v-for="(item, i) in pegsLength"
          :key="i"
          class="mx-3 peg-btn"
          small
          fab
          dark
          @click="setPeg(item)"
        >
          <v-icon :color="pegOptions[i].color" class="peg-menu-item">{{
            pegOptions[i].icon
          }}</v-icon>
        </v-btn>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Peg',
  props: {
    slotIndex: {
      type: Number,
      require: true,
      default: 0
    },
    pegIndex: {
      type: Number,
      require: true,
      default: null
    }
  },
  data() {
    return {
      menu: false,
      on: '',
      x: 0,
      y: 0,
      pegIcons: [],
      peg: {},
      pegData: {
        colors: [
          {
            icon: 'mdi-circle',
            color: 'green'
          },
          {
            icon: 'mdi-circle',
            color: 'orange'
          },
          {
            icon: 'mdi-circle',
            color: 'purple'
          },
          {
            icon: 'mdi-circle',
            color: 'red'
          },
          {
            icon: 'mdi-circle',
            color: 'white'
          },
          {
            icon: 'mdi-circle',
            color: 'yellow'
          },
          {
            icon: 'mdi-circle',
            color: 'black'
          },
          {
            icon: 'mdi-circle',
            color: 'teal'
          }
        ],

        numbers: [
          {
            icon: 'mdi-numeric-1-circle',
            color: 'teal'
          },
          {
            icon: 'mdi-numeric-2-circle',
            color: 'teal'
          },
          {
            icon: 'mdi-numeric-3-circle',
            color: 'teal'
          },
          {
            icon: 'mdi-numeric-4-circle',
            color: 'teal'
          },
          {
            icon: 'mdi-numeric-5-circle',
            color: 'teal'
          },
          {
            icon: 'mdi-numeric-6-circle',
            color: 'teal'
          },
          {
            icon: 'mdi-numeric-7-circle',
            color: 'teal'
          },
          {
            icon: 'mdi-numeric-8-circle',
            color: 'teal'
          }
        ],

        emoticons: [
          {
            icon: 'mdi-emoticon',
            color: 'yellow'
          },
          {
            icon: 'mdi-emoticon-cool',
            color: 'yellow'
          },
          {
            icon: 'mdi-emoticon-angry',
            color: 'yellow'
          },
          {
            icon: 'mdi-emoticon-cry',
            color: 'yellow'
          },
          {
            icon: 'mdi-emoticon-frown',
            color: 'yellow'
          },
          {
            icon: 'mdi-emoticon-tongue',
            color: 'yellow'
          },
          {
            icon: 'mdi-emoticon-wink',
            color: 'yellow'
          },
          {
            icon: 'mdi-emoticon-sad',
            color: 'yellow'
          }
        ],

        sports: [
          {
            icon: 'mdi-basketball',
            color: 'orange'
          },
          {
            icon: 'mdi-soccer',
            color: 'white'
          },
          {
            icon: 'mdi-baseball',
            color: 'white'
          },
          {
            icon: 'mdi-tennis-ball',
            color: 'green'
          },
          {
            icon: 'mdi-volleyball',
            color: 'white'
          },
          {
            icon: 'mdi-billiards',
            color: 'white'
          },
          {
            icon: 'mdi-bowling',
            color: 'brown'
          },
          {
            icon: 'mdi-blur-radial',
            color: 'black'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('settings', ['mode', 'level', 'pegsLength', 'pegSlotLength']),
    pegOptions() {
      const pegs = this.pegData[this.$store.state.gameModes[this.mode]]
      return pegs
    },
    getPeg() {
      // console.log(`getPeg(): pegIcon = ${icon}`)
      return this.peg
    }
  },
  created() {
    this.initPeg()
  },
  methods: {
    initPeg() {
      this.peg.icon =
        this.pegIndex != null
          ? this.pegOptions[this.pegIndex].icon
          : 'mdi-help-circle'
      this.peg.color =
        this.pegIndex != null ? this.pegOptions[this.pegIndex].color : 'teal'

      // console.log(`initPeg(): pegIndex=${this.pegIndex}, peg=${JSON.stringify(this.peg)}`)
    },
    setPeg(index) {
      const peg = {
        slotIndex: this.slotIndex,
        pegIndex: index - 1,
        icon: this.pegOptions[index - 1].icon,
        color: this.pegOptions[index - 1].color
      }

      this.peg.icon = this.pegOptions[index - 1].icon
      this.peg.color = this.pegOptions[index - 1].color
      this.$emit('set-peg', peg)
    },
    pegHover(e) {
      console.log(`pegHover()`)
      e.preventDefault()
      this.x = e.clientX
      this.y = e.clientY
    }
  }
}
</script>

<style>
.peg-btn {
  background-color: #000;
  width: 36px;
  height: 36px;
  margin: 0 auto;
  font-size: 44px;
  border-radius: 50%;
  box-shadow: #666 -2px -2px 6px, inset #222 -10px -10px 10px !important;
}
.peg-btn i {
  color: teal !important;
  font-size: 44px !important;
}
.peg-menu {
  /* transform: translateX(-50%); */
}
</style>
