import firebase from "firebase";

export default {
    actions: {
        async createRecord(context, record) {
            try {
                const uid = await context.dispatch("getUid")
                return await firebase.database().ref(`users/${uid}/records`).push(record)

            } catch (e) {
                context.commit('setError', e)
                throw e
            }

        },
        async fetchRecords(context) {
            try {
                const uid = await context.dispatch("getUid")
                const records = (await (firebase.database().ref(`users/${uid}/records`).once('value'))).val() || {}

                return Object.keys(records).map(key => ({...records[key], id:key}))
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        },
        async fetchRecordById(context, id) {
            try {
                const uid = await context.dispatch("getUid")
                const record = (await (firebase.database().ref(`users/${uid}/records`).child(id).once('value'))).val() || {}

                return {...record, id}
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        }
    },
}