<script>
import { mapActions, mapState } from 'pinia';
import { RouterLink, RouterView } from 'vue-router'
import tasksStore from '../stores/tasks';
import UserStore from '@/stores/user.js';

export default{
  name: 'HomeView',
  data: () => ({
    newTask: '',
    taskToUpdateField: '',
    appTitle: 'IRONHACKERS TASKS PROJECT',
    sidebar: false,
    completedTasks: [],
    uncompletedTasks: [],
    taskToUpdate: '',
    dialog: false,
  }),
  components: {
    RouterLink,
    RouterView,
  },
  methods: {
    ...mapActions(tasksStore, ['_fetchAllTasks', '_addNewTask', '_updateData', '_deleteData', '_updateTitle']),
    ...mapActions(UserStore, ['signOut']),
    AddTask() {
      if (this.newTask.trim() === '') {
        return
      }
      this._addNewTask({ title: this.newTask, user_id: this.user.id });
      this.newTask =  '';
    },  
    setTaskState({ is_complete, id }){
      this._updateData({ is_complete, id });
    },
    deleteTask(id) {
      this._deleteData({ id: id });
    },
    updateTitle() {

      this._updateTitle({ title: this.taskToUpdateField, id: this.taskToUpdate.id });
      this.dialog = false;
      this.taskToUpdate = '';
    },
    required (v) {
        return !!v || 'Field is required'
      },
  },
  computed: {
    ...mapState(tasksStore, ['tasksList']),
    ...mapState(UserStore, ['user'])
  },
  created() {
    this._fetchAllTasks();
  },
  mounted() {
  }
}
</script>

<template>
  <main>
    <v-toolbar class="toolBar">
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer; text-decoration: none; color: black;">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          :key="'Home'"
          :to="'/'">
          <v-icon left dark icon="mdi-home"></v-icon>
          Home
        </v-btn>
        <v-btn
          flat
          :key="'Sign Out'"
          @click="signOut()">
          <v-icon left dark icon="mdi-logout"></v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-expansion-panels class="addTaskPanel">
      <v-expansion-panel>
        <v-expansion-panel-title>
          <template v-slot:default="{ expanded }">
            <v-row no-gutters>
              <v-col cols="4" class="d-flex justify-start">
                Add Task
              </v-col>
              <v-col
                cols="8"
                class="text-grey"
              >
                <v-fade-transition leave-absolute>
                  <span
                    v-if="expanded"
                    key="0"
                  >
                    Enter here for add new task in your agend
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-text-field
            v-model="newTask"
            hide-details
            placeholder="Task"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              class="buttons"
              @click="AddTask()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-container>
      <v-row>
        <v-col
          :key="n"
          cols="12"
          sm="6"
        >
        <v-table theme="light">
          <thead>
            <tr>
              <th class="text-left titles">
                Tasks to do
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in this.tasksList.filter((t) => !t.is_complete)" :key="task.id">
              <td>
                <v-row no-gutters @click.prevent="updateTitle()">
                  <v-col cols="9" sm="9" xs="9" style="margin-right: -10%;">
                    {{ task.title }}
                  </v-col>
                  <v-col cols="1" sm="1" xs="1" class="mr-2">
                    <input type="checkbox" @click="setTaskState({ is_complete: true, id: task.id })">
                  </v-col>
                  <v-col cols="1" sm="1" xs="1" class="mr-2">
                    <v-icon left dark icon="mdi-delete" @click="deleteTask(task.id)"></v-icon>
                  </v-col>
                  <v-col cols="1" sm="1" xs="1" class="mr-2">
                    <template v-slot:activator="{ props }">
                      <v-icon icon="mdi-pencil" v-bind="props"></v-icon>
                    </template>
                    <v-dialog v-model="dialog" width="800">
                      <template v-slot:activator="{ props }">
                        <v-icon icon="mdi-pencil" v-bind="props" @click="taskToUpdate = task"></v-icon>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Update task</span>
                        </v-card-title>
                        <v-card-text>
                          <v-text-field
                            hide-details
                            disabled
                          >{{ taskToUpdate.title }}</v-text-field>
                          <v-text-field
                            v-model="taskToUpdateField"
                            hide-details
                            placeholder="New task Name"
                            class="mt-4"
                            :rules="[required]"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            variant="text"
                            @click="dialog = false"
                            class="buttons"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            variant="text"
                            class="buttons"
                            @click="updateTitle()"
                          >
                            Update
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>
              </td> 
            </tr>
          </tbody>
        </v-table>
        </v-col>
        <v-col
          :key="n"
          cols="12"
          sm="6"
        >
        <v-table theme="light">
          <thead>
            <tr>
              <th class="text-left titles">
                Tasks done
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in this.tasksList.filter((t) => t.is_complete)" :key="task.id" @click.prevent="updateTitle()">
              <td>
                <v-row no-gutters>
                  <v-col cols="9" sm="9" xs="9" style="margin-right: -10%;">
                    {{ task.title }}
                  </v-col>
                  <v-col cols="1" sm="1" xs="1" class="mr-2">
                    <input type="checkbox" checked="true" @click.prevent="setTaskState({ is_complete: false, id: task.id })">
                  </v-col>
                  <v-col cols="1" sm="1" xs="1" class="mr-2">
                    <v-icon left dark icon="mdi-delete" @click="deleteTask(task.id)"></v-icon>
                  </v-col>
                  <v-col cols="1" sm="1" xs="1" class="mr-2">
                    <template v-slot:activator="{ props }">
                      <v-icon icon="mdi-pencil" v-bind="props"></v-icon>
                    </template>
                    <v-dialog v-model="dialog" width="800">
                      <template v-slot:activator="{ props }">
                        <v-icon icon="mdi-pencil" v-bind="props" @click="taskToUpdate = task"></v-icon>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Update task</span>
                        </v-card-title>
                        <v-card-text>
                          <v-text-field
                            hide-details
                            disabled
                          >{{ taskToUpdate.title }}</v-text-field>
                          <v-text-field
                            v-model="taskToUpdateField"
                            hide-details
                            placeholder="New task Name"
                            class="mt-4"
                            :rules="[required]"
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            variant="text"
                            @click="dialog = false"
                            class="buttons"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            variant="text"
                            class="buttons"
                            @click="updateTitle()"
                          >
                            Update
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>
              </td> 
            </tr>
          </tbody>
        </v-table>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<style>
table, th, td {
  border:1px solid black;
}
.completedState{
  background-color: green;
}
.uncompletedState {
  background-color: yellow;
}
.toolBar {
  background-color: #adb5bd;
}
.buttons {
  color: #212529;
}
.addTaskPanel {
  margin: 2% 0;
}
.titles {
  background-color: #adb5bd;
}
.p {
  white-space: nowrap;
      text-overflow: ellipsis;
}
</style>
