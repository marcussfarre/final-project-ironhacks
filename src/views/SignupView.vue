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
    confirmedPassword: '',
    showPassword: false,
    showConfirmedPassword: false,
    loading: false,
    form: false,
  }),
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      if (this.password.trim() === '' || this.email.trim() === '') {
        return;
      }
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.signUp(userData.email, userData.password);
    },
    required (v) {
        return !!v || 'Field is required'
    },
  }
}
</script>

<template>
    <v-card class="signUpCard">
      <v-form
        v-model="form"
        @submit.prevent="handleSignUp"
      >
        <v-card-item>
          <v-card-title>Sign Up</v-card-title>
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
            <v-text-field
              :rules="[[required], (this.password === this.confirmedPassword) || 'Password must match']"
              clearable
              style="margin-top: 3%;"
              v-model="confirmedPassword"
              :append-icon="!showConfirmedPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmedPassword ? 'text' : 'password'"
              name="userConfirmPassword"
              label="Confirm Password"
              hint="At least 8 characters"
              counter
              @click:append="showConfirmedPassword = !showConfirmedPassword"
            ></v-text-field>
        </v-card-item>
        <v-card-actions>
          <v-btn prepend-icon="mdi-post" 
                style="margin-bottom: 5%;"
                type="submit"
                :loading="loading"
                :disabled="!form">
            Sign Up
          </v-btn>
          <v-btn prepend-icon="mdi-login" style="margin-bottom: 5%;">
            <router-link to="/auth/sign-in" style="text-decoration: none; color: inherit;">Sign In</router-link>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
</template>

<style scoped>
.signUpCard {
  margin: 20% auto;
}
</style>