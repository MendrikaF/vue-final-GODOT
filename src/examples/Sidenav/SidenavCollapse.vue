<template>
  <router-link
    :data-bs-toggle="collapse ? 'collapse' : ''"
    :to="collapse ? `#${collapseRef}` : collapseRef"
    :aria-controls="formattedCollapseRef"
    :aria-expanded="isExpanded"
    class="nav-link"
    :class="getRoute() === formattedCollapseRef ? `active bg-gradient-${color}` : ''"
    v-bind="$attrs"
    @click="isExpanded = !isExpanded"
  >
    <div
      class="text-center d-flex align-items-center justify-content-center"
      :class="isRTL ? ' ms-2' : 'me-2'"
    >
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">{{
      navText
    }}</span>
  </router-link>
  <div :class="isExpanded ? 'collapse show' : 'collapse'">
    <slot name="list"></slot>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "SidenavCollapse",
  props: {
    collapseRef: {
      type: String,
      required: true
    },
    navText: {
      type: String,
      required: true
    },
    collapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  },
  computed: {
    ...mapState(["isRTL", "color"]),
    formattedCollapseRef() {
      // Ici on supprime le '/' si présent dans collapseRef
      return this.collapseRef.replace('/', '');  // Retire le premier '/'
    }
  }
};
</script>
