<template>
  <section class="mint-page">
    <h3 class="title">
      Mint Ticket
    </h3>
    <b-field class="mt-5" label="Select Store" label-position="inside">
      <b-select v-model="mintStore" class="custom" placeholder="Select a store">
        <option value="" disabled>
          Select a store
        </option>
        <option v-for="(aStore, i) in store" :key="i" :value="aStore.id">
          {{ aStore.name }}
        </option>
      </b-select>
    </b-field>
    <p class="med--text">
      Image, Video, Audio, or 3D Model
    </p>
    <p class="sub2">
      File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB,<br> GLTF. Max size: 100 MB
    </p>
    <div class="mt-5">
      <b-field>
        <b-upload
          v-model="dropFiles"
          :disabled="dropFiles?.length > 0"
          multiple
          drag-drop
          @input="compressImage"
        >
          <section class="section">
            <div class="content has-text-centered">
              <p class="has-text-white">
                <b-icon
                  icon="upload"
                  size="is-large"
                />
              </p>
              <p class="has-text-white">
                Drop your files here or click to upload
              </p>
            </div>
          </section>
        </b-upload>
      </b-field>

      <div class="tags">
        <span
          v-for="(file, index) in dropFiles"
          :key="index"
          class="tag is-primary"
        >
          {{ file.name }}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFile(index)"
          />
        </span>
      </div>
    </div>
    <div class="mt-5">
      <b-field label="Name" label-position="inside">
        <b-input v-model="ticketName" class="custom" placeholder="Ticket Name" />
      </b-field>
    </div>
    <div class="mt-5 input--grid">
      <b-field label="Event Time" label-position="inside">
        <b-datetimepicker
          v-model="eventTime"
          class="custom--input"
          placeholder="Type or select a date..."
          icon="calendar-today"
          :locale="locale"
          editable
        />
      </b-field>
      <b-field label="Event Venue" label-position="inside">
        <b-input v-model="venue" class="custom" placeholder="Madison Square Garden" />
      </b-field>
    </div>
    <div class="mt-5">
      <b-field label="Ticket Copies" label-position="inside">
        <b-input v-model="amount" class="custom" placeholder="20" />
      </b-field>
    </div>
    <div class="mt-5">
      <p class="med--text">
        Description
      </p>
      <p class="sub2">
        The description will be included on the item's detail page underneath its <br>image. Markdown syntax is supported.
      </p>
      <b-field class="mt-3" label="Message" label-position="inside">
        <b-input v-model="description" class="custom" maxlength="200" placeholder="Lorem ipsum dolor sit amet." type="textarea" />
      </b-field>
    </div>
    <div class="mt-5">
      <button class="button is-primary" @click.prevent="mintTicket">
        {{ isMinting ? "Minting your Ticket" : "Mint Ticket" }}
      </button>
    </div>
  </section>
</template>

<script>
import { mapWritableState } from 'pinia'
import Compressor from 'compressorjs'
import { useStore } from '@/store'
import fetchMinterStores from '~/apollo/queries/minterStores.gql'

export default {
  name: 'MintTicket',
  layout: 'dashboard',
  data () {
    return {
      dropFiles: [],
      locale: 'en-US',
      mintStore: '',
      ticketName: '',
      amount: '',
      eventTime: '',
      venue: '',
      description: '',
      isMinting: false
    }
  },
  apollo: {
    store: {
      query: fetchMinterStores,
      prefetch: true,
      variables () {
        return {
          minter: 'aef.testnet'
        }
      }
    }
  },
  computed: {
    sampleFormat () {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: undefined
      })
      return dtf.format(new Date())
    },
    ...mapWritableState(useStore, ['wallet', 'details', 'isConnected', 'loading', 'creator'])
  },
  methods: {
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    },
    compressImage (e) {
      return Compressor
    },
    mintTicket () {
      if (!this.mintStore) {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'You need a Store tot mint tickets',
          position: 'is-top-right',
          type: 'is-danger'
        })
        return
      }
      if (!this.wallet || !this.wallet?.minter) { return }
      /* if (!coverImage) { return } */

      this.isMinting = true
    }
  }
}
</script>

<style lang='scss'>
  .mint-page {
    height: calc(100vh - 5.4rem - 70px);
    .input--grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
    }
    .field {
      //display: inline-block;
      max-width: 520px;
      label {
        color: #fafafa;
      }
      .custom {
        input, select, textarea {
          background: transparent;
          color: #fafafa;
          &::placeholder {
            color: #a0a0a0;
          }
        }
      }
      .custom--input{
        input {
          background: transparent;
          color: #fafafa;
          &::placeholder {
            color: #a0a0a0;
          }
        }
      }
      input {
        &::placeholder {
          color: #a0a0a0;
        }
      }
    }
    .title {
      color: #fafafa;
      font-size: 1.5rem;
      margin: 0;
    }
    sup {
      color: red;
    }
    .sub {
      color: #fafafa;
      margin-top: 8px;
      font-size: .8rem;
    }
    .sub2 {
      color: #fafafa;
      margin-top: 0;
      font-size: .8rem;
    }
    .med--text {
      font-size: 1rem;
      font-weight: 600;
      color: #fafafa;
    }
  }
</style>
