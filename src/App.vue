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
  <RouterView />
</template>

<style scoped>
</style>
