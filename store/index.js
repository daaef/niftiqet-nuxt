export const state = () => {
  return {
    wallet: undefined,
    details: {
      accountId: '',
      balance: '',
      allowance: '',
      contractName: '',
    },
    isConnected: false,
  }
}

export const mutations = {
  setWallet(state, payload) {
    state.wallet =  payload
  },
  setDetails(state, payload) {
    state.details = payload
  },
  setIsConnected(state, payload) {
    state.isConnected = payload
  }
}

export const actions = {

}

export const getters = {
  nigerianStates(state) {
    return state.nigerianStates
  },
}
