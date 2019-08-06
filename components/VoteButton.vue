<template>
  <div class="vote-button has-text-right">
    <no-ssr>
      <p v-if="voteError">
        <strong class="has-text-danger">{{ voteErrorMessage }}</strong>
      </p>
      <button
        class="button is-primary is-large"
        :class="{ 'is-loading': processingVote }"
        :disabled="!readyToVote"
        @click="submitVote"
      >
        <span v-if="readyToVote && !voteSubmitted">Submit Vote</span>
        <span v-if="voteSubmitted">Update Vote</span>
        <span v-if="!readyToVote">Waiting for votes...</span>
      </button>
    </no-ssr>
  </div>
</template>

<script>
import uuid from 'uuidv4'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('votes', [
      'userId',
      'voteSubmitted',
      'processingVote',
      'voteError',
      'voteErrorMessage'
    ]),
    ...mapGetters('votes', ['readyToVote'])
  },
  mounted() {
    if (this.userId === null) {
      this.setUserId(uuid())
    }
  },
  methods: {
    ...mapMutations('votes', ['setUserId']),
    ...mapActions('votes', ['submitVote'])
  }
}
</script>

<style>
.vote-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
