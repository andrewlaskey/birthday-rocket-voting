export const state = () => {
  return {
    rockets: [],
    newRocketName: '',
    newRocketUserName: '',
    newRocketFileUrl: '',
    rocketPhotoFile: null,
    isRocketLoading: false,
    rocketError: false,
    submitSuccess: false,
    errorMessage: ''
  }
}

export const mutations = {
  resetRockets(state) {
    state.rockets = []
  },

  addRocket(state, payload) {
    state.rockets.push(payload)
  },

  setRocketName(state, payload) {
    state.newRocketName = payload
  },

  setRocketUserName(state, payload) {
    state.newRocketUserName = payload
  },

  setRocketFileUrl(state, payload) {
    state.newRocketFileUrl = payload
  },

  setRocketPhotoFile(state, payload) {
    state.rocketPhotoFile = payload
  },

  setRocketError(state, payload) {
    state.rocketError = payload
  },

  setLoading(state, payload) {
    state.isRocketLoading = payload
  },

  setSubmitSuccess(state, payload) {
    state.submitSuccess = payload
  },

  setErrorMessage(state, payload) {
    state.errorMessage = payload
  }
}

export const actions = {
  triggerRocketError(context, { message }) {
    context.commit('setLoading', false)
    context.commit('setRocketError', true)
    context.commit('setErrorMessage', message)
  },

  async uploadRocketPhoto({ state, commit, dispatch }) {
    try {
      const result = await this.$db.uploadFile(state.rocketPhotoFile)

      if (result.success) {
        commit('setRocketFileUrl', result.downloadPath)
        dispatch('uploadPhotoSuccess')
      } else {
        throw new Error('Upload file error')
      }
    } catch (error) {
      dispatch('triggerRocketError', error)
    }
  },

  uploadPhotoSuccess(context) {
    context.dispatch('addNewRocket')
  },

  async addNewRocket({ state, dispatch }) {
    try {
      const newRocket = {
        name: state.newRocketName,
        user: state.newRocketUserName,
        photo: state.newRocketFileUrl
      }

      console.log(newRocket)

      const result = await this.$db.addRocket(newRocket)

      if (result.success) {
        dispatch('addRocketSuccess', {
          id: result.doc.id,
          ...result.rocket
        })
      } else {
        throw new Error('Submit rocket error.')
      }
    } catch (error) {
      dispatch('triggerRocketError', error)
    }
  },

  submitForm(context) {
    context.commit('setLoading', true)
    context.commit('setRocketError', false)
    context.dispatch('uploadRocketPhoto')
  },

  addRocketSuccess({ commit }, newRocket) {
    commit('setLoading', false)
    commit('setSubmitSuccess', true)
    commit('addRocket', newRocket)
    commit('setRocketName', '')
    commit('setRocketUserName', '')
    commit('setRocketPhotoFile', null)
  },

  async getRockets({ commit, dispatch }) {
    commit('setLoading', true)
    commit('setRocketError', false)
    commit('resetRockets')

    try {
      const result = await this.$db.getRockets()

      if (result.success) {
        commit('setLoading', false)
        /* prettier-ignore */
        result.rockets.forEach((rocket) => {
          commit('addRocket', rocket)
        })
      } else {
        throw new Error('There was a problem getting the rockets')
      }
    } catch (error) {
      dispatch('triggerRocketError', error)
    }
  }
}
