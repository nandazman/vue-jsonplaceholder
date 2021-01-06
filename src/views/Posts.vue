<template>
  <div id="post">
    <Loader v-if="showLoadingInit" />
    <div v-else class="post-list-container">
      <div class="toolbar-post">
        <p class="title">Posts By {{username}}</p>
        <button title="add" class="btn btn-small" @click="initAddPost">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <Post  v-for="(post, index) in posts" :key="index" :post="post" v-on:edit="initEditPost" />
    </div>
    <div v-if="postDialog" class="modal">
      <PostForm v-on:close="postDialog = false" :post="getPost" />
    </div>
  </div>
</template>

<script>
import postsAPI from '@/API/posts';
import { mapActions, mapGetters } from 'vuex';
import Loader from '@/components/Loader.vue';
import PostForm from '@/components/PostForm.vue';
import Post from '@/components/Post.vue';

export default {
  name: 'UserPosts',
  components: {
    Loader,
    PostForm,
    Post
  },
  props: {
    username: String
  },
  data() {
    return {
      showLoadingInit: true,
      showLoadingDelete: false,
      postDialog: false,
      post: {
        id: 0,
        title: '',
        body: ''
      }
    }
  },
  methods: {
    ...mapActions('posts', ['applyPostData', 'removePostById']),
    async getPostByUserId() {
      const response = await postsAPI.get({ params: `?userId=${this.$route.params.id}`})
      const data = await response.json();
      this.applyPostData(data);
      this.showLoadingInit = false;
    },
    initAddPost() {
      this.post = {
        id: 0,
        title: "",
        body: ""
      };
      this.postDialog = true;
    },
    initEditPost(id) {
      const data = this.posts.find((post) => post.id === id);
      this.post = data;
      this.postDialog = true;
    },
    async deletePostById(id) {
      this.showLoadingDelete = true;
      await postsAPI.delete({ params: id });
      this.removePostById(id);
      this.showLoadingDelete = false;
    },
  },
  computed: {
    ...mapGetters({
      posts: 'posts/getPosts'
    }),
    getPost() {
      return {...this.post};
    }
  },
  created() {
    this.getPostByUserId();
  }
}
</script>

<style scoped lang="scss">
.post-list-container {
  .toolbar-post {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      margin: .5rem 0;
    }
  }
  .post-list {
    border: 1px solid #e3e3e3;
    max-width: 450px;
    padding: 3rem 1rem 1rem;
    transition: all 250ms;
    position: relative;
    &:hover {
      border-left: 1px solid #7d09b8;
    }
    .title {
      font-weight: bold;
      text-transform: capitalize;
      margin-bottom: .25rem;
    }
    .action {
      position: absolute;
      top: 5px;
      right: 0;
    }
  }
}
</style>
