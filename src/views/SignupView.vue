<script>
import { mapActions, mapState } from 'pinia';
import userStore from '../stores/user';

export default{
  name: 'SignupView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signIn']),
    handleSignUp() {
      const userData = {
        email: 'marcussfarre@gmail.com',
        password: 'marc1234',
      };
      this.signUp(userData.email, userData.password);
    }
  }
}
</script>

<template>
    <h1>SignupView View!</h1>
    <button @click="handleSignUp">SignUp</button>
    <router-link to="/auth/sign-in">Sign In</router-link>>
</template>
