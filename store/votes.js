export const state = () => {
  return {
    votes: [],
    highest: null,
    style: null,
    favorite: null,
    userId: null,
    voteSubmitted: false,
    processingVote: false,
    voteError: false,
    voteErrorMessage: ''
  }
}

export const getters = {
  readyToVote(state) {
    return state.userId && state.highest && state.style && state.favorite
  }
}

export const mutations = {
  resetVotes(state) {
    state.votes = []
  },

  addVote(state, payload) {
    state.votes.push(payload)
  },

  setHighest(state, payload) {
    state.highest = payload
  },

  setStyle(state, payload) {
    state.style = payload
  },

  setFavorite(state, payload) {
    state.favorite = payload
  },

  setUserId(state, payload) {
    state.userId = payload
  },

  setVoteSubmitted(state, payload) {
    state.voteSubmitted = payload
  },

  setProcessingVote(state, payload) {
    state.processingVote = payload
  },

  setVoteError(state, payload) {
    state.voteError = payload
  },

  setVoteErrorMessage(state, payload) {
    state.voteErrorMessage = payload
  }
}

export const actions = {
  triggerVoteError({ commit }, error) {
    console.error(error)
    commit('setProcessingVote', false)
    commit('setVoteError', true)
    commit('setVoteErrorMessage', error.message)
  },

  async getVotes({ commit, dispatch }) {
    commit('setVoteError', false)
    commit('resetVotes')

    try {
      const result = await this.$db.getVotes()

      if (result.success) {
        /* prettier-ignore */
        result.votes.forEach((vote) => {
          commit('addVote', vote)
        })
      }
    } catch (error) {
      dispatch('triggerVoteError', error)
    }
  },

  async submitVote({ commit, dispatch, state }) {
    commit('setProcessingVote', true)
    commit('setVoteError', false)

    try {
      const vote = {
        id: state.userId,
        highest: state.highest,
        style: state.style,
        favorite: state.favorite
      }

      const result = await this.$db.submitVote(vote)

      if (result.success) {
        dispatch('submitVoteSuccess')
      } else {
        throw result.error || new Error('Failed to submit vote')
      }
    } catch (error) {
      dispatch('triggerVoteError', error)
    }
  },

  submitVoteSuccess({ commit, dispatch }) {
    commit('setProcessingVote', false)
    commit('setVoteSubmitted', true)
    dispatch('getVotes')
  }
}
