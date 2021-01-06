<template>
  <div class="card-user">
    <div class="user-detail">
      <p class="title">Personal</p>
      <p class="content sub-title">{{user.name}}</p>
      <p class="content"><i class="far fa-envelope"></i> {{user.email}}</p>
      <p class="content"><i class="fas fa-phone-alt"></i> {{user.phone}}</p>
      <p class="content"><i class="fas fa-globe"></i> {{user.website}}</p>
    </div>
    <hr class="divider" v-if="showAction">
    <div class="user-company">
      <p class="title">Company</p>
      <p class="content sub-title">{{user.company.name}}</p>
      <p class="content">{{user.company.catchPhrase}}</p>
      <p class="content">{{user.company.bs}}</p>
      <div class="action" v-if="showAction">
        <router-link v-if="user.id <= 10" :to="{ path: `detail/${user.id}`}">
          <button v-if="user.id <= 10" title="detail" class="btn btn-small">
            <i class="fas fa-eye"></i>
          </button>
        </router-link>
        <button title="edit" class="btn btn-small" @click="initEditUser(user.id)">
          <i class="fas fa-edit"></i>
        </button>
      </div>
    </div>
    <button v-if="showAction" title="delete" class="btn btn-small delete" @click="deleteUserById(user.id)">
      <i v-if="showLoadingDelete" class="fas fa-spinner fa-spin"></i>
      <i v-else class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
import {  mapActions, mapGetters } from 'vuex';
import usersAPI from '@/API/users';

export default {
  name: 'User',
  props: {
    user: Object,
    showAction: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLoadingDelete: false
    }
  },
  methods: {
    ...mapActions('users', ['removeUserById']),
    async deleteUserById(id) {
      this.showLoadingDelete = true;
      await usersAPI.delete({ params: id });
      this.removeUserById(id);
      this.showLoadingDelete = false;
    },
    initEditUser(id) {
      const data = this.users.find((user) => user.id === id);
      this.$emit('edit', data);
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/getUsers'
    })
  }
}
</script>

<style scoped lang="scss">
.card-user {
  min-height: 200px;
  background:#fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  transition: all 250ms;
  margin: .5rem;
  border-radius: 5px;
  position: relative;
  display: flex;
  border: 1px solid #e3e3e3;
  border-top: 5px solid #7d09b8;
  overflow-wrap: break-word;
  width: max-content;
  @media only screen and (max-width: 520px) {
    flex-direction: column;
  }
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }
  .user-detail {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 250px;
    font-size: 14px;
  }
  .user-company {
    padding: 1rem;
    position: relative;
    width: 250px;
    font-size: 14px;
    @media only screen and (max-width: 520px) {
          padding-bottom: 3rem;
    }
    .action {
      position: absolute;
      right: 0;
      bottom: 5px;
    }
  }
  .divider {
    height: 50%;
    margin-top: 2.75rem;
  }
  .title {
    text-align: center;
    font-weight: bold;
    margin-bottom: .5rem;
  }
  .sub-title {
    font-weight: 500;
  }
  .content {
    padding: .1rem 0;
  }
  .delete {
    position: absolute;
    right: 0;
    top: 3px;
  }
}
</style>
