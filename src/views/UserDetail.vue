<template>
  <div id="user-detail">
    <router-link to="/">
      <button class="btn btn-middle">
        <i class="fas fa-arrow-left"></i> Back
      </button>
    </router-link>
    
    <Loader v-if="showLoadingInit" />
    <User v-else :user="user" />
    <div class="tab-container">
      <div class="tab-nav">
        <router-link :to="{ path: 'posts'}">
          <div class="tab-item" :class="{ active: getActiveTab === 'posts'}">Post</div>
        </router-link>
        <router-link :to="{ path: 'albums'}">
          <div class="tab-item" :class="{ active: getActiveTab === 'albums'}">Album</div>
        </router-link>
        <router-link :to="{ path: 'todos'}">
          <div class="tab-item" :class="{ active: getActiveTab === 'todos'}">Todo</div>
        </router-link>
      </div>
      <div class="tab-content">
        <router-view :username="user.name"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from '@/API/users';
import User from '@/components/User.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'UserDetail',
  components: {
    User,
    Loader
  },
  data() {
    return {
      id: 0,
      showLoadingInit: true,
      activeTab: 'post',
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
    checkId() {
      const id = +this.$route.params.id;
      return id && !isNaN(id) && id <= 10
    },
    async getUserData() {
      const response = await usersAPI.get({ params: this.id})
      this.user = await response.json();
      this.showLoadingInit = false;
    }
  },
  computed: {
    getActiveTab() {
      const path = this.$route.path;
      return path.substring(path.lastIndexOf('/') + 1);
    }
  },
  created() {
    if (!this.checkId()) {
      this.$router.push('/');
    }
    this.id = +this.$route.params.id;
    this.getUserData();
  }
}
</script>


<style lang="scss">
  #user-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tab-nav {
      margin-top: 2rem;
      display: flex;
      @media only screen and (max-width: 520px) {
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
      }
      .tab-item {
        width: 150px;
        padding: 2rem 3rem;
        border: 1px solid #e3e3e3;
        cursor: pointer;
        transition: all 250ms;
        text-align: center;
        &:nth-child(2) {
          border-left: none;
          border-right: none;
        }
        &.active, &:hover {
          background: #7d09b8;
          color: white;
        }
      }
    }
  }
</style>
