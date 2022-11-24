import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vue-croppa/dist/vue-croppa.css";
import Croppa from "vue-croppa";

const app = createApp(App);

app.use(router);
app.mount("#app");
