import firebase from 'firebase/app'

export default {
    actions: {
        async login(context, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                context.commit('setError', e)
                throw e
            }

        },
        async logout(context) {
            await firebase.auth().signOut()
            context.commit('clearInfo')
        },
        async register(context, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await context.dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name: name
                })
            } catch (e) {
                context.commit('setError', e)
                throw e
            }


        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}