<template>
    <div class="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
        <div class="flex-1">
            <!-- Título de la tarea -->
            <h3 class="text-xl font-medium text-gray-800">{{ props.title }}</h3>

            <!-- Fecha de creación y finalización debajo del título -->
            <p class="text-sm text-gray-500">
                <span class="font-semibold">{{ props.fechaCreacion }}</span>
                -
                <span class="font-semibold">{{ props.fechaFinalizacion }}</span>
            </p>

            <!-- Descripción de la tarea -->
            <p class="text-gray-600 mt-2">{{ props.descripcion }}</p>
        </div>

        <!-- Botones de acción (Editar y Eliminar) -->
        <div class="flex flex-row items-center space-y-2">
            <button @click="emit('update', props.idTarea)"
                class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto text-xs font-medium">
                Editar
            </button>

            <button @click="emit('delete', props.idTarea)"
                class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 w-full sm:w-auto text-xs font-medium">
                Eliminar
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

const emit = defineEmits(['delete', 'update']);

const props = defineProps<{
    idTarea?: number;
    title?: string;
    descripcion?: string;
    estado?: string;
    fechaCreacion?: string;
    fechaFinalizacion?: string;
}>();

</script>