import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/router';

Vue.use(Vuex);
let baseUrl = "https://5ec27ea38ebdcc0016a59db2.mockapi.io/todoVue";
let baseUrlSubtasks = "https://5ec27ea38ebdcc0016a59db2.mockapi.io/todoVueSubtasks"

let store = new Vuex.Store({
    state: {
        tasks: [],
        subtasks: [],
        task: {}
    },
    mutations: {
        ADD_TASK_TO_STATE: (state, payload) => {
            state.task = payload
        },

        CLEAR_TASK: (state) => {
            state.task = {}
        },

        SET_TASKS_TO_STATE: (state, tasks) => {
            state.tasks = tasks
        },

        ADD_TASKS_TO_STATE: (state, payload) => {
            state.tasks.push(payload)
        },

        DEL_TASKS_TO_STATE: (state, payload) => {
            state.tasks = state.tasks.filter(elem => elem.id !== payload.id)
        },

        FILTER_SUBTASKS_TO_STATE: (state) => {
            state.subtasks = state.subtasks.slice().sort((a, b) => a.status - b.status)
        },

        SET_SUBTASK_TO_STATE: (state, subtasks) => {
            state.subtasks = subtasks
        },

        ADD_SUBTASKS_TO_STATE: (state, payload) => {
            state.subtasks.unshift(payload)
        },

        DEL_SUBTASKS_TO_STATE: (state, payload) => {
            state.subtasks = state.subtasks.filter(elem => elem.id !== payload.id)
        }
    },
    actions: {
        GET_TASKS({ commit }) {
            axios.get("https://5ec27ea38ebdcc0016a59db2.mockapi.io/todoVue")
                .then(response => commit('SET_TASKS_TO_STATE', response.data))
        },

        CLEAR_TASK(context) {
            context.commit("CLEAR_TASK")
        },

        GET_TASK(context, payload) {
            axios.get(`${baseUrl}/${payload}`).then(response => context.commit("ADD_TASK_TO_STATE", response.data))
        },

        CREATE_TASK(context, payload) {
            axios.post(baseUrl, payload)
                .then(response => {
                    context.commit("ADD_TASKS_TO_STATE", response.data)
                    router.push({ path: `/` })
                })
                .catch(error => {
                    console.log(error)
                })
        },

        UPDADATE_TASK(context, payload) {
            console.log(payload.id)
            console.log(payload)
            axios.put(`${baseUrl}/${payload.id}`, payload).then(() => {
                context.dispatch("GET_TASK", payload.id)
            }
            ).catch(error => {
                console.log(error)
            })
        },

        DEL_TASK(context, payload) {
            axios.delete(`${baseUrl}/${payload}`, payload)
                .then(response => {
                    context.commit("DEL_TASKS_TO_STATE", response.data)
                })
        },

        GET_SUBTASKS(context) {
            axios.get(`${baseUrlSubtasks}`)
                .then(response => {
                    context.commit("SET_SUBTASK_TO_STATE", response.data)
                    context.commit("FILTER_SUBTASKS_TO_STATE")
                }
                )
        },

        CREATE_SUBTASK(context, payload) {
            axios.post(baseUrlSubtasks, payload)
                .then(response => {
                    context.commit("ADD_SUBTASKS_TO_STATE", response.data)
                    context.commit("FILTER_SUBTASKS_TO_STATE")
                })
                .catch(error => {
                    console.log(error)
                })
        },

        DEL_SUBTASK(context, payload) {
            axios.delete(`${baseUrlSubtasks}/${payload}`, payload)
                .then(response => {
                    context.commit("DEL_SUBTASKS_TO_STATE", response.data)
                })
        },

        UPDADATE_SUBTASK(context, payload) {
            axios.put(`${baseUrlSubtasks}/${payload.id}`, payload)
                .then(() => {
                    context.dispatch("GET_SUBTASKS")
                })
                .catch(error => {
                    console.log(error)
                })
        },

    },
    getters: {
        TASKS(state) {
            return state.tasks
        },
        SUBTASKS(state) {
            return state.subtasks
        },
        TASK(state) {
            return state.task
        }
    }
})

export default store