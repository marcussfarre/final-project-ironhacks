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
      this.tasksList.push(...data);
    },
    async _updateData({ is_complete, id }) {  
      const { data, error } = await supabase
      .from('tasks')
      .update({ 'is_complete': is_complete })
      .eq('id', id)
      .select()

      if (error) {
        console.error(error);
        return;
      }

      this.tasksList.find((t) => t.id === data[0].id).is_complete = data[0].is_complete;
    },
    async _updateTitle({ title, id }) {  
      const { data, error } = await supabase
      .from('tasks')
      .update({ 'title': title })
      .eq('id', id)
      .select()

      if (error) {
        console.error(error);
        return;
      }

      this.tasksList.find((t) => t.id === data[0].id).title = data[0].title;
    },
    async _deleteData({ id }) {
      const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .select()

      if (error) {
        console.error(error);
        return;
      }
      
      const index = this.tasksList.map(e => e.id).indexOf(id);
      this.tasksList.splice(index, 1);
    }
  }
})
