import { defineStore } from "pinia";
import supabase from "@/supabase";

export default defineStore('user', {
    state: () =>  {
        return {
            user: undefined,
        }
    },
    actions: {
        async fetchUser() {      
            const { data: { user } } = await supabase.auth.getUser();
            this.user = user;
        },
        async signUp(email, password) {
            console.log(email);
            console.log(password);
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            if (error) throw error;
            if (data) this.user = data; 
        },
        async signIn(email, password) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) throw error;
            console.log(user);
            if (data) this.user = data; 
        },
        async signOut() {
            console.log('hey');
            const { error } = await supabase.auth.signOut()
            if (error) throw error;
            this.user = null; 
        }
    }
})