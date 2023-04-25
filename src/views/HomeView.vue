<script>
import { mapActions, mapState } from 'pinia';
import tasksStore from '../stores/tasks';

export default{
  name: 'HomeView',
  data: () => ({
    newTask: '',
  }),
  methods: {
    ...mapActions(tasksStore, ['_fetchAllTasks', '_addNewTask']),
    AddTask() {
      if (this.newTask.trim() === '') {
        return
      }
      this._addNewTask({ title: this.newTask, user_id: '5ac5ae7f-b3a5-49da-b4cd-05bede338307' });
    }
  },
  computed: {
    ...mapState(tasksStore, ['tasksList'])
  },
  created() {
    console.log('created hello world');
    this._fetchAllTasks();
  },
  mounted() {
  }
}
</script>

<template>
  <main>
    <h1>Home View!</h1>
    <input type="text" v-model="newTask" placeholder="Add new task">
    <button @click="AddTask()">Add</button>
    <table>
      <tr>
        <th>Tasks</th>
      </tr>
      <tr v-for="task in tasksList" :key="task.id">
        <td>{{ task.title }}</td>
      </tr>
    </table>
  </main>
</template>

<style>
table, th, td {
  border:1px solid black;
}
</style>
