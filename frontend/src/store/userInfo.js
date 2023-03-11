import { defineStore } from 'pinia'

//store for user login
export const userLoginState = defineStore({
  id: 'userLoginState',
  //store logged in state
  state: () => {
    return {
      isLoggedIn: false,
      editor: false, //if false, user = viewer
    }
  },
  actions: {
    login(username, password) {
      const validity = apiLogin(username, password); //check login with api
      if (validity == 'editor') {
        this.isLoggedIn = true; ///logged in
        this.editor = true; //editor role
        this.$router.push("/"); //redirect
        return true;
      }
      else if (validity == 'viewer') {
        this.isLoggedIn = true; ///logged in
        this.$router.push("/"); //redirect
        return true;
      }
      else {
        return false;
      }
      
    }
  }
});

function apiLogin(username, password) { //replace with api check
  if (username == "username" && password == "password") {
    return 'editor';
  }
  else if (username == "username2" && password == "password2") {
    return 'viewer';
  }
  else {
    return false;
  }
}