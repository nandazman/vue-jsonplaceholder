<template>
  <div class="content">
    <h2 class="title">User Form</h2>
    <div class="form">
      <div class="title">Personal</div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="user.name" placeholder="name" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email" v-model="user.email" placeholder="email" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" class="form-control" id="phone" v-model="user.phone" placeholder="phone" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="website">Website</label>
        <input type="text" class="form-control" id="website" v-model="user.website" placeholder="website" autocomplete="off">
      </div>
    </div>
    <div class="form">
      <div class="title">Company</div>
      <div class="form-group">
        <label for="company_name">Name</label>
        <input type="text" class="form-control" id="company_name" v-model="user.company.name" placeholder="name" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="catchPhrase">Catch Phrase</label>
        <input type="text" class="form-control" id="catchPhrase" v-model="user.company.catchPhrase" placeholder="Catch Phrase" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="bs">BS</label>
        <input type="text" class="form-control" id="bs" v-model="user.company.bs" placeholder="bs" autocomplete="off">
      </div>
    </div>
    <div class="action">
      <button title="cancel" class="btn btn-small" @click="closeDialog">
        Cancel
      </button>
      <button title="edit" class="btn btn-small" @click="initSaveUser">
        <i v-if="showLoading" class="fas fa-spinner fa-spin"></i>
        <span v-else>Save</span>
      </button>
    </div>
  </div>
</template>

<script>
import {  mapActions } from 'vuex';
import usersAPI from '@/API/users';

export default {
  name: 'UsersForm',
  inheritAttrs: false,
  props: {
    user: Object
  },
  data() {
    return {
      addUserDialog: false,
      showLoading: false
    }
  },
  methods: {
    ...mapActions('users', ['addUser', 'editUser']),
    closeDialog() {
      this.$emit('close');
    },
    initSaveUser() {
      if (this.user.id) {
        this.initEditUser();
      } else {
        this.initAddUser();
      }
    },
    async initAddUser() {
      this.showLoading = true;
      const response = await usersAPI.post({ payload: this.user });
      const data = await response.json();
      this.addUser(data);
      this.showLoading = false;
      this.$emit('close');
    },
    async initEditUser() {
      this.showLoading = true;
      let data = this.user;
      if (this.user.id <= 10) {
        const response = await usersAPI.put({ params: `${this.user.id}`, payload: this.user });
        data = await response.json();
      }
      this.editUser(data);
      this.showLoading = false;
      this.$emit('close');
    }
  }
}
</script>
