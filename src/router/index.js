import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
// import Billing from "../views/Billing.vue";
import Profile from "../views/Profile.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import ModificationPage from "../views/ModificationPage.vue";
import Statistique from "../views/Statistique.vue";
import Etat from "../views/Etat.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/etat",
    name: "Etat",
    component: Etat,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/statistique",
    name: "Statistique",
    component: Statistique,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: '/modification/:value',
    name: 'modification',
    component: ModificationPage,
    props: true // Cela permet de passer la valeur de la route comme prop à la page de modification
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
