// stores/counter.js
import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
    // Definir el estado
    state: () => ({
        user: null
    }),
    actions: {
        setUser(data) {
            this.user = data;
        }
    }
});