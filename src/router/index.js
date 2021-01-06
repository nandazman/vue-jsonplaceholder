import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import UserDetail from '../views/UserDetail.vue'
import UserPosts from '../views/Posts.vue'
import UserAlbums from '../views/Albums.vue'
import UserTodos from '../views/Todos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Users',
    component: Users
  }, {
    path: '/detail/:id',
    name: 'Users Detail',
    component: UserDetail,
    redirect: '/detail/:id/posts',
    children: [{
      path: 'posts',
      name: 'Users Post',
      component: UserPosts
    }, {
      path: 'albums',
      name: 'Users Album',
      component: UserAlbums,
    }, {
      path: 'todos',
      name: 'Users Todo',
      component: UserTodos,
    }]
  }, {
    path: '*',
    redirect: '/',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
