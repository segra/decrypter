export const state = () => ({
  attempts: [],
  attemptsMax: 8,
  attemptsCount: 0
})

export const getters = {
  attempts: (state) => state.attempts,
  attemptsMax: (state) => state.attemptsMax,
  attemptsCount: (state) => state.attemptsCount
}

export const mutations = {
  ADD_ATTEMPT(state, attempt) {
    state.attempts.push(attempt)
  },
  INCREASE_ATTEMPTS_COUNT(state) {
    state.attemptsCount++
  },
  SET_ATTEMPTS_COUNT(state, count) {
    state.attemptsCount = count
  },
  SET_ATTEMPT(state, attempt) {
    // console.log(`SET_ATTEMPT(attempt= ${JSON.stringify(attempt)})`)
    state.attempts.splice(-1, 1, attempt)
  },
  RESET_ATTEMPTS(state) {
    state.attempts = []
  }
}

export const actions = {
  setAttempt({ commit }, attempt) {
    commit('SET_ATTEMPT', attempt)
  },
  addAttempt({ commit }) {
    const newAttemp = []
    commit('ADD_ATTEMPT', newAttemp)
    commit('INCREASE_ATTEMPTS_COUNT')
  },
  resetAttempts({ commit }) {
    commit('RESET_ATTEMPTS')
    commit('SET_ATTEMPTS_COUNT', 0)
  }
}
