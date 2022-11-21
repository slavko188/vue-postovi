import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";

const app = createApp(App);
app.use(Croppa);
app.use(router);
app.mount("#app");
