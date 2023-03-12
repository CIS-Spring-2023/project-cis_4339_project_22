import { defineStore } from 'pinia'
import bcrypt from 'bcryptjs';

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
    async login(username, password) {
      const validity = await apiLogin(username, password); //check login with api
      if (validity == 'editor') {
        this.isLoggedIn = true; ///logged in
        this.editor = true; //editor role
        this.$router.push("/"); //redirect
        return true;
      }
      else if (validity == 'viewer') {
        this.isLoggedIn = true; ///logged in
        this.editor = false;
        this.$router.push("/"); //redirect
        return true;
      }
      else {
        return false;
      }
      
    }
  }
});

async function apiLogin(username, password) { //replace with api check
  const salt = await bcrypt.genSalt(10);
  const editorUsername = 'username';
  const editorPassword = 'password';
  const viewerUsername = 'username2';
  const viewerPassword = 'password2';
  //encrypt passwords before checking
  const hashedPassword = await bcrypt.hash(password, salt);
  const hashedEditorPassword = await bcrypt.hash(editorPassword, salt);
  const hashedViewerPassword = await bcrypt.hash(viewerPassword, salt);
  if (username == editorUsername && hashedPassword == hashedEditorPassword) {
    return 'editor';
  }
  else if (username == viewerUsername && hashedPassword == hashedViewerPassword) {
    return 'viewer';
  }
  else {
    return false;
  }
}