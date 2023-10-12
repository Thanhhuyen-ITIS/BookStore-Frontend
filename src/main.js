import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./axios";

import { registerGlobalComponents } from "./utils/import";

import "./assets/style/tailwind.css";
import "./assets/style/global.css";

let app = createApp(App);
registerGlobalComponents(app);
app.use(store).use(router).mount("#app");
