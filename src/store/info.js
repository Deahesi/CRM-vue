import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo(context) {
            try {
                const uid = await context.dispatch("getUid")
                const info = (await firebase.database().ref(`users/${uid}/info`).once("value")).val()
                context.commit('setInfo', info)
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        },
        async updateInfo(context, toUpdate) {
            try {
                const uid = await context.dispatch("getUid")
                const updateData = {...context.getters.info, ...toUpdate}
                await firebase.database().ref(`users/${uid}/info`).update(updateData)
                context.commit('setInfo', updateData)
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        }
    },
    getters: {
        info: s => s.info
    }
}