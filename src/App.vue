<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <!-- image and text -->
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <a class="navbar-brand" href="#">
                <img
                  src="@/assets/slika.png"
                  height="40"
                  class="d-inline-block align-top"
                  alt=""
                  loading="lazy"
              /></a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">Sign up</router-link>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            v-model="store.searchTerm"
            class="form-control"
            type="search"
            placeholder="pretrazi"
            aria-label="search"
          />
        </form>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import store from "@/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

onAuthStateChanged(getAuth(), (user) => {
  const currentRoute = router.currentRoute; // vrace objekat trenutne rute(name,component,meta itd).

  if (user) {
    console.log("***", user.email);
    store.currentUser = user.email;

    if (!currentRoute.value.meta.needsUser) {
      router.push({ name: "login" });
    }
  } else {
    console.log("nema ulogovanog korisnika");
    store.currentUser = null;

    if (currentRoute.value.meta.needsUser) {
      router.push({ name: "login" });
    }
  }
});

const logout = () => {
  getAuth()
    .signOut()
    .then(() => {
      console.log("Nema ulogovanog usera");

      router.replace({ name: "login" });
    })
    .catch((error) => {
      console.error("Doslo je do greske", error);
    });
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  a {
    font-weight: bold;
    text-decoration: none;
  }

  &.router-link-exact-active {
    color: white;
    background: rgb(21, 45, 180);
  }
}
</style>
