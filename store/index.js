export const state = () => ({
  config: [],
  order: [],
  orderLoadingStatus: false,
})

export const mutations = {
  setConfig(state, config) {
    state.config = config
  },
  setOrder(state, order) {
    state.order = order
  },
  setOrderLoadingStatus(state, status) {
    state.orderLoadingStatus = status
  },
}

export const actions = {
  async fetchConfig({commit}) {
    const config = await this.$axios.$get('/api')

    commit('setConfig', config)
  },
  async fetchOrder({commit}, hash) {
    const config = await this.$axios.$get(`/api/order/${hash}`)

    commit('setOrder', config)
  },
  async reFetchOrder({commit}, hash) {
    commit('setOrderLoadingStatus', true)
    const config = await this.$axios.$get(`/api/order/${hash}`)

    commit('setOrder', config)
    commit('setOrderLoadingStatus', false)
  },
}

export const getters = {
  config: state => state.config,
  order: state => state.order,
  orderLoadingStatus: state => state.orderLoadingStatus,
}
