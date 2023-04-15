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
  }
});