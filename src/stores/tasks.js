import { defineStore } from 'pinia'
import supabase  from '@/supabase/index';

export default defineStore('tasks', {
  state: () => ({
    tasksList: []
  }),
  actions: {
    async _fetchAllTasks() {      
      const { data, error } = await supabase
      .from('tasks')
      .select()

      if (error) {
        console.error(error);
        return;
      }
      console.log('hey')
      console.log(data);
      this.tasksList = data;
    },
    async _addNewTask({ title, user_id }) {
      const { data, error } = await supabase
      .from('tasks')
      .insert({ title, user_id })
      .select()

      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      this.tasksList.push(...data);
    }
  }
})
