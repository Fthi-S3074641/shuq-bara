import Vue from 'vue'
import Vrouter from 'vue-router'

import welcome from './../views/welcome'

Vue.use(Vrouter)

export default new Vrouter({
    routes: [
        {
            path: '/',
            name: '/welcome',
            component: welcome
        }
    ]
})