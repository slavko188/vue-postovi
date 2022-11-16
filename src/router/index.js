import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

export const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      needsUser: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(
    "Stara ruta ",
    from.name,
    "->",
    "Nova ruta",
    to.name,
    "Korisnik",
    store.currentUser
  );

  const noUser = store.currentUser === null;

  if (noUser && to.meta.needsUser) {
    next("login");
  } else {
    next();
  }
});

export default router;
