<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Just start <b-icon icon="rocket" size="is-large" />"
    </h2>
    <h3 class="subtitle is-6 has-text-grey">
      Author: <a href="https://github.com/anteriovieira"> Antério Vieira </a>
    </h3>
    <button @click="!isConnected ? wallet?.connect({requestSignIn: true}) : wallet?.disconnect()">{{ !isConnected ? 'Connect' : 'Disconnect' }}</button>
  </section>
</template>

<script>
export default {
  name: 'InspirePage',
  data() {
    return {
      wallet: null,
      isConnected: false,
      details: {}
    }
  },
  watch: {
    wallet(n, o){
      console.log('new', n.isConnected())
      console.log('old', o)
    },
  },
  mounted() {
    this.$walletService.walletProvider({apiKey: this.$config.apiKey}).then(async (res) => {
      await console.log('Response', res)
      this.wallet = res.wallet
      this.isConnected = res.isConnected
      this.details = res.details
    })
  },
}
</script>
