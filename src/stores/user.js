import { defineStore } from "pinia";
import supabase from "@/supabase";

export default defineStore('user', {
    state: () =>  {
        return {
            user: null,
        }
    },
    actions: {
        async fetchUser() {      
            const { data: { user } } = await supabase.auth.getUser();
            this.user = user;
        },
        async signUp(email, password) {
            const { user, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            if (error) throw error;
            if (user) this.user = user; 
        },
        async signIn(email, password) {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) throw error;
            if (user) this.user = user; 
        },
        async signOut() {
            const { error } = await supabase.auth.signOut()
            if (error) throw error;
            this.user = null; 
        }
    }
})