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
    showPassword: false,
    loading: false,
    form: false,
  }),
  methods: {
    ...mapActions(userStore, ['signIn']),
    handleSignIn() {
      if (this.password.trim() === '' || this.email.trim() === '') {
        return;
      }
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.signIn(userData.email, userData.password);
    },
    required (v) {
        return !!v || 'Field is required'
      },
  }
}
</script>

<template>
    <v-card class="signInCard">
      <v-form
        v-model="form"
        @submit.prevent="handleSignIn"
      >
        <v-card-item>
          <v-card-title>Sign In</v-card-title>
          <v-text-field
                :rules="[required]"
                clearable
                style="margin-top: 3%;"
                v-model="email"
                :type="'text'"
                name="userEmail"
                label="Email"
                hint="Email Required"
              ></v-text-field>
          <v-text-field
                :rules="[required]"
                clearable
                style="margin-top: 3%;"
                v-model="password"
                :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                name="userPassword"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="showPassword = !showPassword"
              ></v-text-field>
        </v-card-item>
        <v-card-actions>
          <v-btn prepend-icon="mdi-login" 
                style="margin-bottom: 5%;"
                type="submit"
                :loading="loading"
                :disabled="!form">
            Sign In
          </v-btn>
          <v-btn prepend-icon="mdi-post" 
                 style="margin-bottom: 5%;">
            <router-link to="/auth/sign-up" style="text-decoration: none; color: inherit;">Sign Up</router-link>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
</template>

<style scoped>
.signInCard {
  margin: 20% auto;
}
</style>