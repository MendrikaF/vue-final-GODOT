import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import MaterialDashboard from "./material-dashboard";
import axios from 'axios';

// Créez l'application Vue
const app = createApp(App);

// Configurer axios globalement
app.config.globalProperties.$axios = axios;

// Utiliser le store, le router et MaterialDashboard
app.use(store);
app.use(router);
app.use(MaterialDashboard);

// Monter l'application
app.mount("#app");

// Importez les fonctions nécessaires de Firebase
import { initializeApp } from "firebase/app";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDPgAgphb2oj1UzZBDe6uYGMGH_DxygkRc",
  authDomain: "fir-auth-tutorial-bb138.firebaseapp.com",
  projectId: "fir-auth-tutorial-bb138",
  storageBucket: "fir-auth-tutorial-bb138.firebasestorage.app",
  messagingSenderId: "403340230811",
  appId: "1:403340230811:web:6b8268d2f4f6030a6b063e",
  measurementId: "G-TNSS3GFWHL"
};

// Initialiser Firebase
initializeApp(firebaseConfig);
