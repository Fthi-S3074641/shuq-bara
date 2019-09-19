import Vue from 'vue'
import Vrouter from 'vue-router'

import welcome from './../views/welcome'
import register from './../views/register'
import read from './../views/read'
import report from './../views/report'
import getcomment from './../views/getcomment'
import comments from './../views/comments'

Vue.use(Vrouter)

export default new Vrouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
      },
    routes: [
        {
            path: '/',
            name: '/welcome',
            component: welcome
        },
        {
            path: '/register',
            name: '/register',
            component: register
        },
        {
            path: '/read',
            name: '/read',
            component: read
        },
        {
            path: '/report',
            name: '/report',
            component: report
        },
        {
            path: '/getcomment',
            name: '/getcomment',
            component: getcomment
        },
        {
            path: '/comments',
            name: '/comments',
            component: comments
        }
    ],
    mode: 'history'
})