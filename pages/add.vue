<template>
  <div class="container">
    <div>
      <h1 class="title">
        🤳Add Rocket
      </h1>
      <p style="margin-bottom: 1rem;">
        <nuxt-link to="/">
          Back to list
        </nuxt-link>
      </p>
      <div class="columns is-centered">
        <div class="column is-half">
          <form @submit.prevent="addRocket">
            <div class="field">
              <div class="control">
                <input
                  id="rocket"
                  name="rocket"
                  class="input is-primary"
                  type="text"
                  placeholder="Rocket Name"
                  :value="newRocketName"
                  @input="setRocketName($event.target.value)"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  id="name"
                  name="name"
                  class="input is-primary"
                  type="text"
                  placeholder="Your Name"
                  :value="newRocketUserName"
                  @input="setRocketUserName($event.target.value)"
                />
              </div>
            </div>
            <div class="field">
              <div class="file">
                <label class="file-label">
                  <input
                    class="file-input"
                    type="file"
                    name="photo"
                    @change="addPhotoFile"
                  />
                  <span class="file-cta">
                    <span class="file-label">
                      Upload a picture
                    </span>
                  </span>
                  <span v-if="rocketPhotoFile" class="file-name">
                    {{ rocketPhotoFile.name }}
                  </span>
                </label>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button
                  class="button"
                  :class="{ 'is-loading': isRocketLoading }"
                  :disabled="isRocketLoading"
                >
                  Submit
                </button>
              </div>
            </div>
            <div v-if="rocketError" class="field">
              <article class="message is-danger">
                <div class="message-body">
                  {{ errorMessage }}
                </div>
              </article>
            </div>
            <div v-if="submitSuccess" class="field">
              <article class="message is-success">
                <div class="message-body">
                  Rocket has been added for voting!
                </div>
              </article>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('rockets', [
      'newRocketName',
      'newRocketUserName',
      'rocketPhotoFile',
      'isRocketLoading',
      'rocketError',
      'submitSuccess',
      'errorMessage'
    ])
  },
  methods: {
    ...mapMutations('rockets', [
      'setRocketName',
      'setRocketUserName',
      'setRocketPhotoFile'
    ]),
    ...mapActions('rockets', ['submitForm']),
    addPhotoFile(e) {
      const input = e.target

      if (input.files && input.files[0]) {
        const file = input.files[0]
        this.setRocketPhotoFile(file)
      }
    },
    addRocket() {
      this.submitForm()
    }
  }
}
</script>

<style></style>
