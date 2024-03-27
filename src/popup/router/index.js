import { createRouter, createWebHashHistory } from 'vue-router'
import Entry from '../views/entry/index.vue'
import Home from '../views/home/index.vue'
import SystemSetting from '../views/systemSetting/index.vue'
import More from '../views/more/index.vue'

const routes = [
    // // URL未包含路由hash，则跳转至Home页面
    // { path: '/', redirect: '/home', exact: true },
    // 精确匹配 #/login，指向Login页面
    // 匹配 #/，指向Entry页面
    {
        path: '/',
        component: Entry,
        // 这里是Entry的二级路由配置
        children: [
            // 精确匹配 #/home，指向Home页面
            {
                path: 'home',
                component: Home,
                exact: true,
            },
            {
                path: 'system',
                component: SystemSetting,
                exact: true,
            },
            {
                path: 'more',
                component: More,
                exact: true,
            },
            // 空hash，则跳转至Home页面
            { path: '', redirect: 'home' },
            // 未匹配，则跳转至Home页面
            { path: '/:pathMatch(.*)', redirect: 'home' },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router