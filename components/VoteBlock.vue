<template>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control">
      <div class="tags has-addons">
        <span class="tag is-light">{{ highestCount }}</span>
        <button
          class="tag is-dark"
          :class="{ 'is-primary': id === highest }"
          @click="voteForHighest"
        >
          Highest Flying
        </button>
      </div>
    </div>

    <div class="control">
      <div class="tags has-addons">
        <span class="tag is-light">{{ styleCount }}</span>
        <button
          class="tag is-dark"
          :class="{ 'is-primary': id === style }"
          @click="voteForStyle"
        >
          Best Style
        </button>
      </div>
    </div>

    <div class="control">
      <div class="tags has-addons">
        <span class="tag is-light">{{ favoriteCount }}</span>
        <button
          class="tag is-dark"
          :class="{ 'is-primary': id === favorite }"
          @click="voteForFavorite"
        >
          Favorite
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('votes', ['votes', 'highest', 'style', 'favorite', 'userId']),
    highestCount() {
      return this.countVotes('highest') + (this.highest === this.id ? 1 : 0)
    },
    styleCount() {
      return this.countVotes('style') + (this.style === this.id ? 1 : 0)
    },
    favoriteCount() {
      return this.countVotes('favorite') + (this.favorite === this.id ? 1 : 0)
    }
  },
  methods: {
    ...mapMutations('votes', ['setHighest', 'setStyle', 'setFavorite']),
    countVotes(category) {
      return this.votes.reduce((total, vote) => {
        if (vote[category] === this.id && vote.id !== this.userId) {
          total++
        }

        return total
      }, 0)
    },
    voteForHighest() {
      this.setHighest(this.id)
    },
    voteForStyle() {
      this.setStyle(this.id)
    },
    voteForFavorite() {
      this.setFavorite(this.id)
    }
  }
}
</script>

<style></style>
