<template>
  <div class="todo-list">
    <div v-if="showLoadingEdit" class="loader-edit">
      <i class="fas fa-spinner fa-lg fa-spin"></i>
    </div>
    <div v-else class="content">
      <div class="completed-container" :class="{ completed: todo.completed}" @click="toggleCompleted(todo.completed)">
      </div>
      <div class="title" :class="{ completed: todo.completed}" @click="toggleCompleted(todo.completed)">
        {{todo.title}}
      </div>
    </div>
    <div class="action">
      <button title="delete" class="btn btn-small btn-no-border" @click="deleteTodoById">
        <i v-if="showLoadingDelete" class="fas fa-spinner fa-spin"></i>
        <i v-else class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import todosAPI from '@/API/todos';
import { mapActions } from 'vuex';

export default {
  name: 'Todo',
  components: {
  },
  props: {
    todo: Object
  },
  data() {
    return {
      showLoadingDelete: false,
      editAlbum: false,
      showLoadingEdit: false
    }
  },
  methods: {
    ...mapActions('todos', ['removeTodoById']),
    async deleteTodoById() {
      const id = this.todo.id;
      this.showLoadingDelete = true;
      await todosAPI.delete({ params: id });
      this.removeTodoById(id);
      this.showLoadingDelete = false;
    },
    async toggleCompleted(currentState) {
      const id = this.todo.id;
      this.showLoadingEdit = true;
      await todosAPI.put({ params: id, payload: this.todo });
      this.showLoadingEdit = false;
      this.todo.completed = !currentState;
    }
  }
}
</script>


<style scoped lang="scss">
.todo-list {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  background: white;
  position: relative;
  padding: 2rem 1rem;
  &:not(:last-child) {
    border-bottom: 2px solid #dedede;
  }
  .loader-edit {
    display: flex;
    justify-content: center;
  }
  .content {
    display: flex;
  }
  .completed-container {
    width: 20px;
    height: 20px;
    border: 1px solid #e3e3e3;
    border-radius: 50%;
    margin-right: 1rem;
    cursor: pointer;
    &.completed {
      &::before {
        content: '✓';
        position: absolute;
        top: 2.25em;
        left: 1.25em;
        font-size: 1rem;
        line-height: 1;
        color: #7d09b8;
      }
    }
  }
  .title {
    cursor: pointer;
    max-width: 350px;
    &:hover {
      color: #7d09b8;
    }
    &.completed {
      text-decoration: line-through;
    }
  }
  .action {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
</style>
