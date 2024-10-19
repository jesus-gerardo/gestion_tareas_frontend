<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-xl w-[800px]">
            <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Crear Tarea</h2>

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
                    <label for="fechaCreacion" class="block text-sm font-medium text-gray-700">Estado</label>
                    <USelect v-model="tarea.estado" :options="['pendiente', 'progreso', 'completado']" size="lg" />
                </div>

                <!-- Campo de Fecha de Creación -->
                <div class="mb-4">
                    <label for="fechaCreacion" class="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                    <UPopover>
                        <input type="text" :value="format(fecha_creacion, 'dd-MM-yyyy')"
                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Fecha de inicio" />

                        <template #panel="{ close }">
                            <DatePicker v-model="fecha_creacion" is-required @close="close"
                                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </template>
                    </UPopover>
                </div>

                <!-- Campo de Fecha de Vencimiento -->
                <div class="mb-6">
                    <label for="fechaVencimiento" class="block text-sm font-medium text-gray-700">Fecha de
                        Vencimiento</label>
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <input type="text" :value="format(fecha_finalizacion, 'dd-MM-yyyy')"
                            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Fecha de inicio" />

                        <template #panel="{ close }">
                            <DatePicker v-model="fecha_finalizacion" is-required @close="close" />
                        </template>
                    </UPopover>
                </div>

                <!-- Botón de Enviar -->
                <div class="flex justify-end">
                    <button type="button" @click="cancel" :disabled="load"
                        :class="[load ? 'opacity-50 cursor-not-allowed' : '']"
                        class="mr-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-300">
                        cancelar
                    </button>

                    <button type="button" @click="save" :disabled="load"
                        :class="[load ? 'opacity-50 cursor-not-allowed' : '']"
                        class=" px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                        Guardar
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

import { useRouter } from 'vue-router';
import { format } from 'date-fns'

import DatePicker from '~/src/components/DatePicker.vue';
// repository
import { TareasRepository } from '@/repository';

const router = useRouter();

const load = ref(false);
const fecha_creacion = ref(new Date())
const fecha_finalizacion = ref(new Date())
const tarea = ref({
    titulo: null,
    descripcion: null,
    estado: 'pendiente',
    fecha_creacion: null,
    fecha_finalizacion: null,
})
const listError = ref([]);

const cancel = () => {
    router.push({ path: '/' })
}

const save = async () => {
    listError.value = []
    try {
        tarea.value.fecha_creacion = format(fecha_creacion.value, 'yyyy-MM-dd');
        tarea.value.fecha_finalizacion = format(fecha_finalizacion.value, 'yyyy-MM-dd');
        load.value = true;
        const { data } = await TareasRepository.create(tarea.value);
        if (!data.success) {
            listError.value.push(
                { field: '', msg: data.msg }
            );
            return;
        }
        router.push({ path: '/' })
    } catch (exception) {
        console.error(exception?.data?.errors);
        for (let key in exception?.data?.errors) {
            listError.value.push(
                { field: key, msg: exception?.data?.errors[key].toString() }
            );
        }
    } finally {
        load.value = false
    }
}
</script>