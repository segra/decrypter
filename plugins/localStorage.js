import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: [
      'locale',
      'isGameInProgress',
      'currentCode',
      'attempts.attempts',
      'attempts.attemptsCount',
      'settings.theme',
      'settings.mode',
      'settings.level',
      'settings.duplicates',
      'settings.pegsLength',
      'settings.pegSlotLength'
    ],
    storage: window.localStorage
  })(store)
}
