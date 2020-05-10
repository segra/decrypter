export const state = () => ({
  theme: true,
  mode: 0,
  level: 1,
  duplicates: true,
  pegsLength: 6,
  pegSlotLength: 4
})

export const getters = {
  theme: (state) => state.theme,
  mode: (state) => state.mode,
  level: (state) => state.level,
  duplicates: (state) => state.duplicates,
  pegsLength: (state) => state.pegsLength,
  pegSlotLength: (state) => state.pegSlotLength
}

export const mutations = {
  SET_THEME(state, payload) {
    state.theme = payload
  },
  SET_MODE(state, payload) {
    state.mode = payload
  },
  SET_LEVEL(state, payload) {
    state.level = payload
  },
  SET_PEGS_LENGTH(state, payload) {
    state.pegsLength = payload
  },
  SET_PEGS_SLOT_LENGTH(state, payload) {
    state.pegSlotLength = payload
  },
  SET_DUPLICATES(state, payload) {
    state.duplicates = payload
  }
}
