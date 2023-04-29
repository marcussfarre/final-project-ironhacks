<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapState } from 'pinia';
import UserStore from '@/stores/user.js';

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView,
  },
  computed: {
    ...mapState(UserStore, ['user'])
  },
  async created() {
    try {
      await this.fetchUser();
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions(UserStore, ['fetchUser', 'signOut']),
    _checkUserExist() {
      if (this.user) {
        this.$router.push({ path: '/' });
      } else {
        this.$router.push({ path: '/auth/sign-in' });
      }
    },
  },
  watch: {
    user () {
      this._checkUserExist();
    }
  },
}
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/auth/sign-in">Sign-In</RouterLink>
        <RouterLink to="/auth/sign-up">Sign-Up</RouterLink>
        <button @click="signOut()">Sign Out</button>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text, green);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
