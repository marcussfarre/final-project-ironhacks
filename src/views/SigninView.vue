<script>
import { mapActions, mapState } from 'pinia';
import userStore from '../stores/user';

export default{
  name: 'SigninView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    ...mapActions(userStore, ['signIn']),
    handleSignIn() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.signIn(userData.email, userData.password);
    },
  }
}
</script>

<template>
    <h1>SigninView View!</h1>
    <label for="">Email</label>
    <input v-model="email" type="text">
    <label for="">Password</label>
    <input v-model="password" type="text">
    <button @click="handleSignIn">SignIn</button>
    <router-link to="/auth/sign-up">Sign Up</router-link>>
</template>
