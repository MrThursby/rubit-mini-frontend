export const state = () => ({
  config: [],
  order: [],
  cycleFetchOn: false,
  orderLoadingStatus: false,
})

export const mutations = {
  setConfig(state, config) {
    state.config = config
  },
  setOrder(state, order) {
    state.order = order
  },
  setCycleFetchOn(state, bool) {
    state.cycleFetchOn = bool
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

    if(config.invoice.status === 'pending' || config.invoice.status === 'created'){
      commit('setCycleFetchOn', true)
    } else {
      commit('setCycleFetchOn', false)
    }

    commit('setOrder', config)
    commit('setOrderLoadingStatus', false)
  },
}

export const getters = {
  config: state => state.config,
  order: state => state.order,
  cycleFetchOn: state => state.cycleFetchOn,
  orderLoadingStatus: state => state.orderLoadingStatus,
}
