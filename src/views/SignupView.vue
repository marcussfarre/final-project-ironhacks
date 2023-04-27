<script>
import { mapActions, mapState } from 'pinia';
import userStore from '../stores/user';

export default{
  name: 'SignupView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.signUp(userData.email, userData.password);
    }
  }
}
</script>

<template>
    <h1>SignupView View!</h1>
    <button @click="handleSignUp">SignUp</button>
    <label for="">Email</label>
    <input v-model="email" type="text">
    <label for="">Password</label>
    <input v-model="password" type="text">
    <button @click="handleSignUp">SignIn</button>
    <router-link to="/auth/sign-in">Sign In</router-link>>
</template>
