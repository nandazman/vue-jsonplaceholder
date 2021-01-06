<template>
  <div id="todo">
    <Loader v-if="showLoadingInit" />
    <div v-else class="todo-lists-container">
      <div class="header">{{username}}'s Todo Lists</div>
      <div class="add-todo">
        <div class="form">
          <div class="form-group">
            <input type="text" class="form-control" id="title" v-model="todo.title" placeholder="New Todo" autocomplete="off">
          </div>
        </div>
        <button title="add" class="btn btn-small" @click="initAddTodo">
          <i v-if="showLoadingAdd" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-plus"></i>
        </button>
      </div>
      <div class="todo-lists">
        <Todo v-for="(todo, index) in todos" :key="index" :todo="todo"/>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';
import Todo from '@/components/Todo.vue';
import todosAPI from '@/API/todos';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserTodos',
  components: {
    Loader,
    Todo
  },
  props: {
    username: String
  },
  data() {
    return {
      showLoadingInit: true,
      showLoadingAdd: false,
      todo: {
        title: '',
        complete: false
      }
    }
  },
  methods: {
    ...mapActions('todos', ['applyTodoData', 'addTodo']),
    async getTodoByUserId() {
      const response = await todosAPI.get({ params: `?userId=${this.$route.params.id}`})
      const data = await response.json();
      this.applyTodoData(data);
      this.showLoadingInit = false;
    },
    async initAddTodo() {
      this.showLoadingAdd = true;
      const response = await todosAPI.post({ payload: this.todo })
      const data = await response.json();
      this.addTodo(data);
      this.showLoadingAdd = false;
      this.todo.title = '';
    }
  },
  computed: {
    ...mapGetters({
      todos: 'todos/getTodos'
    }),
  },
  created() {
    this.getTodoByUserId();
  }
}
</script>

<style scoped lang="scss">
.todo-lists-container {
  max-width: 450px;
  .header {
    margin-top: 1rem;
  }
  .add-todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .form {
      width: 100%;
      margin-right: 1rem;
      padding-left: 0;
      .form-control {
        width: inherit;
      }
    }
    button {
      margin: .5rem 0;
    }
  }
}
</style>