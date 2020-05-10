export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  isGameInProgress: false,
  currentCode: null,
  gameModes: ['colors', 'numbers', 'emoticons', 'sports']
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  SET_CURRENT_CODE(state, currentCode) {
    state.currentCode = currentCode
  },
  SET_GAME_IN_PROGRESS(state, isGameInProgress) {
    state.isGameInProgress = isGameInProgress
  }
}

export const getters = {
  locale: (state) => state.locale,
  isGameInProgress: (state) => state.isGameInProgress,
  currentCode: (state) => state.currentCode,
  gameModes: (state) => state.gameModes
}
