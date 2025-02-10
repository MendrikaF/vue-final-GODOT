<template>
  <navbar btnBackground="bg-gradient-success" />
  <div
    class="page-header align-items-start min-vh-100"
    style="
    /* background-image: url('../assets/img/image.png'); */
    background-color: black;
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Sign in
                </h4>
                <!-- <div class="row mt-3">
                  <div class="col-2 text-center ms-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-facebook text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center px-1">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-github text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center me-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-google text-white text-lg"></i>
                    </a>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="card-body">
              <form role="form" class="text-start mt-3" @submit.prevent="login">
                <div class="mb-3">
                  <material-input v-model="email"
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                  />
                </div>
                <div class="mb-3">
                  <material-input v-model="password"
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                  />
                </div>
                <material-switch id="rememberMe" name="rememberMe"
                  >Remember me</material-switch
                >
                <div class="text-center">
                  <material-button
                    class="my-4 mb-2"
                    variant="gradient"
                    color="success"
                    fullWidth
                    >Sign in</material-button
                  >
                </div>
                <p v-if="error" class="error-message">{{ error }}</p>
                <p class="mt-4 text-sm text-center">
                  Don't have an account?
                  <router-link
                    :to="{ name: 'SignUp' }"
                    class="text-success text-gradient font-weight-bold"
                    >Sign up</router-link
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer position-absolute bottom-2 py-2 w-100">
      <div class="container">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col-12 col-md-6 my-auto">
            <div class="copyright text-center text-sm text-white text-lg-start">
              © {{ new Date().getFullYear() }}, made with
              <i class="fa fa-heart" aria-hidden="true"></i> by
              <a
                href="https://www.creative-tim.com"
                class="font-weight-bold text-white"
                target="_blank"
                >ETU002684 , ETU002767 , ETU2848 , ETU2796</a
              >
             
            </div>
          </div>
          <div class="col-12 col-md-6">
            <ul
              class="nav nav-footer justify-content-center justify-content-lg-end"
            >
              <!-- <li class="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  class="nav-link text-white"
                  target="_blank"
                  >ETU002684 , ETU002767 , ETU2848 , ETU2796</a
                >
              </li> -->
              <!-- <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/presentation"
                  class="nav-link text-white"
                  target="_blank"
                  >About Us</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/blog"
                  class="nav-link text-white"
                  target="_blank"
                  >Blog</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/license"
                  class="nav-link pe-0 text-white"
                  target="_blank"
                  >License</a
                >
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { mapMutations } from "vuex";
import {ref} from "vue";
// import {auth} from "../../firebase";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";


export default {
  name: "sign-in",
  components: {
    Navbar,
    MaterialInput,
    MaterialSwitch,
    MaterialButton,
  },
  setup()
  {
    const email=ref('');
    const password=ref('');
    const router=useRouter();
    const error=ref('');

    const login = async () => {
      try{
        const auth=getAuth();
        await signInWithEmailAndPassword(auth,email.value,password.value);

        router.push('/dashboard');
      }
      catch (errorObj) {
        console.error(errorObj.message);
        error.value='Invalid credentials Please check your email and password';
      }
    }
    return {email,password,login};
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
  },
};
</script>
