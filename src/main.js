import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { setToken } from "./login/check";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

const app = createApp(App);

// setToken('global_token_123');
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$baseUrl = 'http://localhost:5000/';

app.mount('#app');
