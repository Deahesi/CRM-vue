import firebase from "firebase/app"

export default {
    actions: {
        async createCategory(context, {title, limit}) {
            try {
                const uid = await context.dispatch('getUid')
                const category = await firebase.database().ref(`users/${uid}/categories`).push({title, limit})
                return {title, limit, id:category.key}
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        },
        async fetchCategories(context) {
            try {
                const uid = await context.dispatch('getUid')
                const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val() || {}

                return Object.keys(categories).map(key => ({...categories[key], id:key}))
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        },
        async changeCategory(context, {id, title, limit}) {
            try {
                const uid = await context.dispatch('getUid')
                await firebase.database().ref(`users/${uid}/categories`).child(id).update({title, limit})
            } catch(e) {
                context.commit('setError', e)
                throw e
            }
        },
        async fetchCategoryById(context, id) {
            try {
                const uid = await context.dispatch('getUid')
                const category = (await firebase.database().ref(`users/${uid}/categories`).child(id).once('value')).val() || {}

                return {...category, id}
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        },
    }
}