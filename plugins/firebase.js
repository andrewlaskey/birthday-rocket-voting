import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBDBD7zOch6-Xfy_qrkeMumYnfMLXnGvQM',
  authDomain: 'rocket-voting-app.firebaseapp.com',
  databaseURL: 'https://rocket-voting-app.firebaseio.com',
  projectId: 'rocket-voting-app',
  storageBucket: 'rocket-voting-app.appspot.com',
  messagingSenderId: '56302002223',
  appId: '1:56302002223:web:4913ad4f4547b832'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default ({ app }, inject) => {
  /* prettier-ignore */
  const addRocket = async (rocket) => {
    try {
      const newRocket = await firebaseApp
        .firestore()
        .collection('rockets')
        .add(rocket)

      return {
        success: true,
        rocket,
        doc: newRocket
      }
    } catch (error) {
      console.error(error)
      return {
        error,
        success: false
      }
    }
  }

  /* prettier-ignore */
  const uploadFile = async (file) => {
    const storageRef = firebaseApp.storage().ref()

    console.log(file)

    try {
      const downloadPath = await storageRef
        .child('images/' + file.name)
        .put(file)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL()
        })

      return {
        success: true,
        downloadPath
      }
    } catch (error) {
      console.error(error)
      return {
        error,
        success: false
      }
    }
  }

  const getCollection = async (name) => {
    try {
      /* prettier-ignore */
      const items = await firebaseApp
        .firestore()
        .collection(name)
        .get()
        .then((querySnapshot) => {
          const items = []

          if (querySnapshot) {
            querySnapshot.forEach((doc) => {
              items.push({
                id: doc.id,
                ...doc.data()
              })
            })
          }

          return items
        })

      if (items) {
        return {
          success: true,
          items
        }
      }

      throw new Error('Failed to retrieve collection')
    } catch (error) {
      console.error(error)
      return {
        error,
        success: false
      }
    }
  }

  const getRockets = () => {
    return getCollection('rockets').then((result) => {
      if (result.success) {
        return {
          success: true,
          rockets: result.items
        }
      }

      return result
    })
  }

  const getVotes = () => {
    return getCollection('votes').then((result) => {
      if (result.success) {
        return {
          success: true,
          votes: result.items
        }
      }

      return result
    })
  }

  /* prettier-ignore */
  const submitVote = async (vote) => {
    try {
      const userVote = await firebaseApp
        .firestore()
        .collection('votes')
        .doc(vote.id)
        .set(vote)

      return {
        success: true,
        vote,
        doc: userVote
      }
    } catch (error) {
      console.error(error)
      return {
        error,
        success: false
      }
    }
  }

  inject('db', {
    addRocket,
    uploadFile,
    getRockets,
    getVotes,
    submitVote
  })
}
