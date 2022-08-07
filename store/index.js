import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    wallet: undefined,
    details: {
      accountId: '',
      balance: '',
      allowance: '',
      contractName: ''
    },
    isConnected: false,
    loading: false,
    creator: false
  }),
  actions: {
    setupWallet () {
      this.loading = true
      console.log('this', this)
      this.$nuxt.$walletService
        .walletProvider({ apiKey: this.$nuxt.$config.apiKey })
        .then(({ details, wallet, isConnected }) => {
          this.wallet = wallet
          this.isConnected = isConnected
          if (isConnected) {
            this.details = details
          }
          this.loading = false
        })
    },
    async logout ({ commit, dispatch }) {
      await this.wallet?.disconnect()
      this.setupWallet()
    }
  }
})
