import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//前置路由守卫
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    /*
    设置title
  */
    if (to.meta.title) {
      document.title = to.meta.title as string
    } else {
      document.title = import.meta.env.VITE_APP_TITLE
    }

    /*
    验证登录状态
   */
    if (to.matched.length !== 0) {
      if (to.meta.requireAuth) {
        // 判断该路由是否需要登录权限
        if (localStorage.getItem('token')) {
          // 通过浏览器本地缓存判断当前的token是否存在
          next()
        } else {
          // console.log(to.fullPath)
          next({
            path: '/login',
            query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      } else if (localStorage.getItem('token')) {
        // 判断是否登录
        if (to.path !== '/login') {
          //判断是否要跳到登录界面
          next()
        } else {
          /*
             防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页(登录下不允许进入登录页)
           */
          next({
            path: '/',
          })
        }
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  },
)

export default router
