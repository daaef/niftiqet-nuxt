<template>
  <div class="dashboard--layout">
    <DashSideBar />
    <header>
      <DashNav />
      <Nuxt />
      <footer>
        &copy;{{ year }} NIFTIQET
      </footer>
    </header>
  </div>
</template>

<script>
import {
  useStore
} from '@/store'

export default {
  name: 'DashboardLayout',
  setup () {
    const store = useStore()

    return {
      store
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    }
  },
  async mounted () {
    await this.store.setupWallet()
  }
}
</script>
<style lang='scss'>
  .dashboard--layout {
    background: url("~/assets/img/dash-bg.png"), #031f23 no-repeat fixed;
    background-size: cover;
    .navbar {
      .button.is-primary {
        background: #031C1E;
        border-radius: 8px;
        border: 0;
        transition: all 0.3s ease-in-out;
        i.icon {
          color: transparent;
        }
        .mdi {
          color: #ffffff;
        }
        &.hover {
          background: #010909;
        }
      }
      .navbar-item {
        .user--mode {
          background: #031F23;
          border-radius: 45px;
          padding: 4px 8px;
          display: flex;
          position: relative;
          &:before {
            content: '';
            position: absolute;
            top: 4px;
            right: 4px;
            transform: none;
            height: calc(100% - 8px);
            background: #0E3338;
            width: 46%;
            border-radius: 45px;
            transition: .3s ease-in-out;
          }
          span {
            cursor: pointer;
            display: block;
            position: relative;
            padding: 5px;
            font-weight: 400;
            &:first-of-type {
              padding-right: 10px;
            }
            &:last-of-type {
              padding-left: 10px;
              color: #67D2E1;
            }
          }
          &.creator {
            &:before {
              content: '';
              position: absolute;
              top: 4px;
              right: -4px;
              transform: translateX(-100%);
              height: calc(100% - 8px);
              background: #0E3338;
              width: 50%;
              border-radius: 45px;
            }
            span {
              transition: .3s ease-in-out;
              &:first-of-type {
                color: #67D2E1;
              }

              &:last-of-type {
                padding-left: 10px;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
    footer {
      display: flex;
      width: 100%;
      height: 70px;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
  }
</style>
