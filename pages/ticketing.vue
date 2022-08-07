<template>
  <section class="section">
    <div class="">
      <i class="cf cf-near" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'TicketingPage',
  layout: 'dashboard',
  data () {
    return {
      wallet: null,
      isConnected: false,
      details: {}
    }
  }
}
</script>
