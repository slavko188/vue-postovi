<template>
  <div class="about">
    <h1>This is an login page</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter
email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="button" @click="login" class="btn btn-primary">
              Posalji
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
//import { app } from "@/firebase";
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((result) => {
      console.log("Uspjesna registracija", result);

      router.replace({ name: "home" });
    })
    .catch((error) => {
      console.error("Pogresno logovanje", error);
    });
};
</script>
