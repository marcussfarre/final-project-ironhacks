<script>
import { mapActions, mapState } from 'pinia';
import userStore from '../stores/user';

export default{
  name: 'SigninView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signIn']),
    handleSignIn() {
      const userData = {
        email: 'marcussfarre@gmail.com',
        password: 'marc1234',
      };
      this.signIn(userData.email, userData.password);
    }
  }
}
</script>

<template>
    <h1>SigninView View!</h1>
    <button @click="handleSignIn">SignIn</button>
    <router-link to="/auth/sign-up">Sign Up</router-link>>
</template>
