<template>
  <div class="container">
    <div>
      <h1 class="title">
        🚀 Rockets
      </h1>
      <p style="margin-bottom: 1rem;">
        <nuxt-link to="/add">
          Add Your Rocket
        </nuxt-link>
      </p>
      <no-ssr>
        <div v-if="isRocketLoading">
          Loading Rockets...
        </div>
        <ul class="rocket-list">
          <li v-for="rocket in rockets" :key="rocket.id" class="rocket">
            <figure class="image">
              <img :src="rocket.photo" alt="Cool af rocket" />
            </figure>
            <div class="rocket-body">
              <p class="title is-4">
                {{ rocket.name }}
              </p>
              <p class="subtitle is-6">
                {{ rocket.user }}
              </p>
              <div>
                <vote-block :id="rocket.id" />
              </div>
            </div>
          </li>
        </ul>
        <div v-if="rockets.length === 0" class="has-text-centered">
          No rockets yet
        </div>
        <div v-if="rocketError" class="field">
          <article class="message is-danger">
            <div class="message-body">
              {{ errorMessage }}
            </div>
          </article>
        </div>
      </no-ssr>
    </div>
    <vote-button />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VoteBlock from '~/components/VoteBlock'
import VoteButton from '~/components/VoteButton'

export default {
  components: {
    VoteBlock,
    VoteButton
  },
  computed: {
    ...mapState('rockets', [
      'rockets',
      'isRocketLoading',
      'rocketError',
      'errorMessage'
    ])
  },
  mounted() {
    this.getRockets()
    this.getVotes()
  },
  methods: {
    ...mapActions('rockets', ['getRockets']),
    ...mapActions('votes', ['getVotes'])
  }
}
</script>

<style>
.rocket-list {
  margin-bottom: 6rem;
}

.rocket {
  margin-bottom: 2rem;
  padding-top: 1rem;
}

.rocket .image {
  width: 100%;
}

@media screen and (min-width: 601px) {
  .rocket {
    display: flex;
  }

  .rocket .image {
    margin-right: 1rem;
    width: 300px;
  }
}
</style>
