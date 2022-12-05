<template>
  <div class="about">
    <h1>This is an Sign up page</h1>
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
              <label for="exampleInputPassword">Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword"
                placeholder="Password"
              />
              <p v-if="errMsg">{{ errMsg }}</p>
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Repeat Password</label>
              <input
                type="password"
                v-model="passwordRepeat"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="passwordRepeat"
              />
            </div>

            <button type="button" @click="signup" class="btn btn-primary">
              Posalji
            </button>
          </form>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//import { app } from "@/firebase";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();
const passwordRepeat = ref("");

function signup() {
  createUserWithEmailAndPassword(
    getAuth(),
    email.value,
    password.value,
    passwordRepeat.value
  )
    .then((result) => {
      console.log("uspesno logovanje", result);
      //console.log(auth.currentUser);

      router.replace({ name: "login" });
    })
    .catch((error) => {
      //console.log("doslo je do greske", error);
      switch (error) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No acount with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
}
</script>
