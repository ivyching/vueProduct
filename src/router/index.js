import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '*',
            redirect: 'Login'
        },
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})