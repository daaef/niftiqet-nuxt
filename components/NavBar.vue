<template>
  <!--  <nav class="navbar is-transparent">
    <div class="container flex">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          NIFTIQET
        </a>
        <div class="navbar-burger" data-target="navbarExampleTransparentExample">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" href="https://bulma.io/">
            About Us
          </a>
          <a class="navbar-item" href="https://bulma.io/">
            Ticketing
          </a>
          <a class="navbar-item mr-5" href="https://bulma.io/">
            FAQs
          </a>
          <div class="navbar-item">
            <div class="field is-grouped">
              <div class="control">
                <a v-if="!isConnected" class="button is-primary" href="#" @click.prevent="wallet?.connect({requestSignIn: true})">
                  <span class="icon">
                    <IconsWallet />
                  </span>
                  <span>Connect Wallet</span>
                </a>
                <b-dropdown
                  v-model="navigation"
                  position="is-bottom-left"
                  append-to-body
                  aria-role="menu"
                >
                  <template #trigger>
                    <a
                      class="navbar-item"
                      role="button"
                    >
                      <span>Menu</span>
                      <b-icon icon="menu-down" />
                    </a>
                  </template>

                  <b-dropdown-item custom aria-role="menuitem">
                    Logged as <b>Rafael Beraldo</b>
                  </b-dropdown-item>
                  <hr class="dropdown-divider">
                  <b-dropdown-item has-link aria-role="menuitem">
                    <a href="https://google.com" target="_blank">
                      <b-icon icon="link" />
                      Google (link)
                    </a>
                  </b-dropdown-item>
                  <b-dropdown-item value="home" aria-role="menuitem">
                    <b-icon icon="home" />
                    Home
                  </b-dropdown-item>
                  <b-dropdown-item value="products" aria-role="menuitem">
                    <b-icon icon="cart" />
                    Products
                  </b-dropdown-item>
                  <b-dropdown-item value="blog" disabled aria-role="menuitem">
                    <b-icon icon="book-open" type="is-primary" />
                    Blog
                  </b-dropdown-item>
                  <hr class="dropdown-divider" aria-role="menuitem">
                  <b-dropdown-item value="settings">
                    <b-icon icon="settings" />
                    Settings
                  </b-dropdown-item>
                  <b-dropdown-item value="logout" aria-role="menuitem">
                    <b-icon icon="logout" />
                    Logout
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>-->
  <div>
    <b-navbar class="container" :transparent="true">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          NIFTIQET
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <b-navbar-item :to="{ path: '/' }">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Ticketing
          </b-navbar-item>
          <b-navbar-item href="#">
            FAQs
          </b-navbar-item>
          <div class="navbar-item">
            <div class="field is-grouped">
              <div class="control">
                <a v-if="!isConnected" class="button is-primary" href="#" @click.prevent="store.wallet?.connect({requestSignIn: true})">
                  <span class="icon">
                    <IconsWallet />
                  </span>
                  <span class="has-text-weight-semibold">{{ loading ? "Processing..." : 'Connect Wallet' }}</span>
                </a>
                <b-dropdown
                  v-else
                  position="is-bottom-left"
                  append-to-body
                  aria-role="menu"
                >
                  <template #trigger>
                    <!--                    <a
                      class="navbar-item"
                      role="button"
                    >
                      <span class="has-text-weight-semibold">{{ loading ? "Processing..." : details?.accountId }}</span>
                      <b-icon icon="menu-down" type="is-white" />
                    </a>-->
                    <b-button
                      :label="loading ? 'Processing...' : details?.accountId"
                      type="is-primary"
                      tag="a"
                      icon-right="menu-down"
                    />
                  </template>
                  <b-dropdown-item value="products" aria-role="menuitem">
                    Products
                  </b-dropdown-item>
                  <b-dropdown-item value="blog" disabled aria-role="menuitem">
                    Blog
                  </b-dropdown-item>
                  <hr class="dropdown-divider" aria-role="menuitem">
                  <b-dropdown-item value="settings">
                    Settings
                  </b-dropdown-item>
                  <b-dropdown-item value="logout" aria-role="menuitem" @click="disconnectWallet">
                    Logout
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/store'

export default {
  name: 'NavBar',
  setup () {
    const store = useStore()

    return { store }
  },
  data () {
    return {
      checking: 'home'
    }
  },
  computed: {
    // same as above but registers it as this.myOwnName
    ...mapState(useStore, ['wallet', 'details', 'isConnected', 'loading'])
  },
  methods: {
    async disconnectWallet () {
      await this.store?.wallet?.disconnect()
      this.store?.setupWallet()
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
