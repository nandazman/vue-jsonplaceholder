<template>
  <div class="content">
    <h2 class="title">Post Form</h2>
    <div class="form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="post.title" placeholder="title" autocomplete="off">
      </div>
      <div class="form-group">
        <label for="body">Content</label>
        <textarea class="form-control" id="body" v-model="post.body" placeholder="Content" autocomplete="off"></textarea>
      </div>
    </div>
    <div class="action">
      <button title="cancel" class="btn btn-small" @click="closeDialog">
        Cancel
      </button>
      <button title="edit" class="btn btn-small" @click="initSavePost">
        <i v-if="showLoading" class="fas fa-spinner fa-spin"></i>
        <span v-else>Post</span>
      </button>
    </div>
  </div>
</template>

<script>
import {  mapActions } from 'vuex';
import postsAPI from '@/API/posts';

export default {
  name: 'PostsForm',
  props: {
    post: Object
  },
  data() {
    return {
      showLoading: false
    }
  },
  methods: {
    ...mapActions('posts', ['addPost', 'editPost']),
    closeDialog() {
      this.$emit('close');
    },
    initSavePost() {
      if (this.post.id) {
        this.initEditPost();
      } else {
        this.initAddPost();
      }
    },
    async initAddPost() {
      this.showLoading = true;
      const response = await postsAPI.post({ payload: this.post });
      const data = await response.json();
      this.addPost(data);
      this.showLoading = false;
      this.$emit('close');
    },
    async initEditPost() {
      this.showLoading = true;
      let data = this.post;
      if (this.post.id <= 100) {
        const response = await postsAPI.put({ params: `${this.post.id}`, payload: this.post });
        data = await response.json();
      }
      this.editPost(data);
      this.showLoading = false;
      this.$emit('close');
    }
  }
}
</script>
