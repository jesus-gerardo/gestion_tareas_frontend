<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-xl w-[800px] h-[650px]">
            <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Editar Tarea</h2>

            <!-- Formulario -->
            <form v-on:submit.prevent="">
                <!-- Campo de Título -->
                <div class="mb-4">
                    <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
                    <input type="text" v-model="tarea.titulo"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ingresa el título" />
                </div>

                <!-- Campo de Descripción -->
                <div class="mb-4">
                    <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea rows="4" v-model="tarea.descripcion"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ingresa una descripción detallada"></textarea>
                </div>

                <!-- Campo de Fecha de Creación -->
                <div class="mb-4">
                    <label for="fechaCreacion" class="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                    <input type="date" v-model="tarea.fecha_creacion"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>

                <!-- Campo de Fecha de Vencimiento -->
                <div class="mb-6">
                    <label for="fechaVencimiento" class="block text-sm font-medium text-gray-700">Fecha de
                        Vencimiento</label>
                    <input type="date" v-model="tarea.fecha_finalizacion"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>

                <!-- Botón de Enviar -->
                <div class="flex justify-center">
                    <button type="button" @click="update" :disabled="load"
                        :class="[load ? 'opacity-50 cursor-not-allowed' : '']"
                        class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                        Guardar
                    </button>
                </div>

                <div class="flex justify-center py-2">
                    <button type="button" @click="cancel" :disabled="load"
                        :class="[load ? 'opacity-50 cursor-not-allowed' : '']"
                        class="w-full px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-300">
                        cancelar
                    </button>
                </div>

                <div v-if="listError.length > 0" class="w-full py-1">
                    <div class="bg-red-500 text-white p-4 rounded-lg shadow-md w-full bg-opacity-80">
                        <!-- Mensajes de error -->
                        <div>
                            <ul class="space-y-1">
                                <li v-for="(error, index) in listError" :key="index">
                                    {{ error.field }}: {{ error.msg }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { TareasRepository } from '@/repository';

const route = useRoute();
const router = useRouter()

const load = ref(false);
const tarea = ref({
    titulo: null,
    descripcion: null,
    fecha_creacion: new Date(),
    fecha_finalizacion: new Date(),
})
const listError = ref([]);

onMounted(() => {
    loadTarea()
});

const loadTarea = async () => {
    try {
        const { data } = await TareasRepository.findOne(route.params.id);
        tarea.value = { ...data };
    } catch (exception) {
        console.error(exception)
        for (let key in exception?.data?.errors) {
            listError.value.push(
                { field: key, msg: exception?.data?.errors[key].toString() }
            );
        }
    }
}

const cancel = () => {
    router.push({ path: '/' })
}

const update = async () => {


}


</script>