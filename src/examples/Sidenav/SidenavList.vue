<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="/dashboard"
          navText="Home"
        >
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="/etat"
          navText="Etat"
        >
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="/tables"
          navText="Insertion Plat"
        >
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="/statistique"
          navText="Statistique"
        >
        </sidenav-collapse>
      </li>
      
      
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder text-white"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          ACCOUNT PAGES
        </h6>
      </li>
      
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="/sign-in"
          navText="SignIn"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">login</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="/sign-up"
          navText="SignUp"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">assignment</i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
    <div class="sidenav-footer position-absolute w-100 bottom-0">
      <div class="mx-3">
        <a
          class="btn mt-4 w-100"
          :class="`bg-gradient-${this.$store.state.color}`"
          href="#"
          ></a
        >
      </div>
    </div>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
  },
};
</script>
