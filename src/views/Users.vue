<template>
  <div class="user-data">
    <button class="btn btn-middle add-user" @click="initAddUser">
      <i class="fas fa-plus"></i> User
    </button>
    <Loader v-if="showLoadingInit" />
    <div v-else class="user-list">
      <User v-for="(user, index) in users" :key="index" :user="user" v-on:edit="initEditUser" :showAction="true" />
    </div>
    <div v-if="addUserDialog" class="modal">
      <UserForm v-on:close="addUserDialog = false" :user="getUser" />
    </div>
  </div>
</template>

<script>
import User from '@/components/User.vue';
import Loader from '@/components/Loader.vue';
import UserForm from '@/components/UserForm.vue';
import usersAPI from '@/API/users';
import {  mapActions, mapGetters } from 'vuex';

export default {
  name: 'Users',
  components: {
    User,
    UserForm,
    Loader
  },
  data() {
    return {
      addUserDialog: false,
      showLoadingInit: true,
      user: {
        id: 0,
        name: "",
        email: "",
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
      }
    }
  },
  methods: {
    ...mapActions('users', ['applyUserData']),
    async fetchDataUser() {
      const response = await usersAPI.get();
      const data = await response.json();
      this.applyUserData(data);
      this.showLoadingInit = false;
    },
    initEditUser(data) {
      this.user = data;
      this.addUserDialog = true;
    },
    initAddUser() {
      this.user = {
        id: 0,
        name: "",
        email: "",
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
      };
      this.addUserDialog = true;
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/getUsers'
    }),
    getUser() {
      return {...this.user};
    }
  },
  created() {
    this.fetchDataUser();
  }
}
</script>

<style scoped lang="scss">
.add-user {
  margin-bottom: .5rem;
}
.user-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  max-width: 600px;
}
</style>
