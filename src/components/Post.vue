<template>
  <div class="post-list">
    <p class="title">{{post.title}}</p>
    <p class="content">{{post.body}}</p>
    <div class="action">
      <button title="edit" class="btn btn-small" @click="edit(post.id)">
        <i class="fas fa-edit"></i>
      </button>
      <button title="delete" class="btn btn-small" @click="deletePostById(post.id)">
        <i v-if="showLoadingDelete" class="fas fa-spinner fa-spin"></i>
        <i v-else class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import postsAPI from '@/API/posts';
import { mapActions } from 'vuex';

export default {
  name: 'Post',
  components: {
  },
  props: {
    post: Object
  },
  data() {
    return {
      showLoadingDelete: false,
      postDialog: false
    }
  },
  methods: {
    ...mapActions('posts', ['removePostById']),
    edit(id) {
      this.$emit('edit', id);
    },
    async deletePostById(id) {
      this.showLoadingDelete = true;
      await postsAPI.delete({ params: id });
      this.removePostById(id);
      this.showLoadingDelete = false;
    },
  }
}
</script>


<style scoped lang="scss">
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
</style>
