// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'



import App from './App'
import router from './router'


Vue.config.productionTip = false
Vue.use(VueAxios, Axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

router.beforeEach((to, from, next) => {

    if (to.meta.requireAuth) {
        const api = "/api/user/check";
        Axios.post(api).then((response) => {
            if (response.data.success) {
                console.log(to.meta.title)
                if (to.meta.title) {
                    document.title = to.meta.title
                }
                next();
            } else {
                next({
                    path: '/login'
                })
            }
        });

    } else {
        next();
    }


})