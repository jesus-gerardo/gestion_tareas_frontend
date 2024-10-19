// stores/counter.js
import { defineStore } from 'pinia';

export const TareaStore = defineStore('tareas', {
    // Definir el estado
    state: () => ({
        tarea_id: null,
        estado: 'pendiente'
    }),
    actions: {
        setTareaId(data) {
            this.tarea_id = data;
        },
        setEstado(data){
            this.estado = data;
        }
    }
});