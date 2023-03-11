<script>
import { userLoginState } from "@/store/userInfo";

export default {
  data() {
    return {
      username: '',
      password: '',
      loginError: false
    }
  },
  setup() {
    const user = userLoginState();
    return {user};
  },
  methods:{
    login() {
      const loginSuccess = this.user.login(this.username, this.password);
      if (!loginSuccess) { //login error
        this.loginError = true;
      }
    }
  }
}
</script>
<template>
  <header>
    <!-- user login header -->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
            User Login
    </h1>
  </header>
    <main class="w-100">
      <!-- main content div -->
        <div class="px-10 py-20" style="width:50%; margin-left: 25%;">
          <!-- input 1 -->
          <label class="block">
              <span class="text-gray-700">Username</span>
              <span style="color: #ff0000">*</span>
            <input
                type="text"
                class="mb-6 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="username"
              />
          </label>
          <!-- input 2 -->
          <label class="block">
              <span class="text-gray-700">Password</span>
              <span style="color: #ff0000">*</span>
            <input
                type="password"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="password"
              />
          </label>
          <!--login error message-->
          <div v-if="loginError" style="color: #ff0000">Incorrect Login. <br> Hint: username = "username", password = "password" for editor role. <br> username = "username2", password = "password2" for viewer role</div>
          <!-- submit button -->
          <div class="mt-10">
            <button class="bg-red-700 text-white rounded" type="submit" v-on:click="login">
              Login
            </button>
          </div>
        </div>
    </main>
</template>