import Vue from 'vue'
import Router from 'vue-router'

import TodoList from '../components/TodoList.vue'
import TaskCreator from '../components/TaskCreator.vue'
Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: TodoList
        },
        {
            path: '/task:id',
            name: 'task',
            component: TaskCreator,
            props: true,
        },

    ]

})

export default router