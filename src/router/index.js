import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      layout: "default",
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/BookList.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "auth",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "auth",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/books",
    name: "booklist",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/BookList.vue"),
  },
  {
    path: "/admin/book/:id",
    name: "bookdetail",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/BookDetail.vue"),
  },
  {
    path: "/book/:id",
    name: "bookdetailuser",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "bookdetail" */ "../views/BookDetailUser.vue"
      ),
  },
  {
    path: "/carts",
    name: "carts",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "carts" */ "../views/CartList.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "carts" */ "../views/OrderList.vue"),
  },
  {
    path: "/book-manager",
    name: "bookmanager",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "carts" */ "../views/BookManager.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
