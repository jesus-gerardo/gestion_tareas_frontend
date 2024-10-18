<template>
    <div class="bg-gray-100 p-6">

        <!-- Card Principal -->
        <div class="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
            <!-- Título y Botón -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-semibold text-gray-800">Lista de Tareas</h2>
                <button
                    class="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition duration-300 text-xs"
                    @click="create">
                    Agregar
                </button>
            </div>

            <!-- listado de tareas -->
            <div class="space-y-4">
                <listComponent v-for="tarea in tareaList" :id-tarea="tarea.id" :title="tarea.titulo"
                    :descripcion="tarea.descripcion" :fecha-creacion="tarea.fecha_creacion"
                    :fecha-finalizacion="tarea.fecha_finalizacion" :estado="tarea.estado" @delete="destroy"
                    @update="update" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// modules
import listComponent from '@/components/list.component.vue';

// repository
import { TareasRepository } from '@/repository';

// attribute
const tareaList: any = ref([]);
const router = useRouter();

onMounted(() => {
    init()
});

const init = async () => {
    const { data } = await TareasRepository.findAll();
    tareaList.value = [
        ...data
    ];
}

const create = () => {
    console.log('creacion')
    router.push({path:'tarea/add'})

}

const update = (id: number) => {
    router.push({path: `tarea/${id}`});
}

const destroy = async (id: number) => {
    try {
        const { data } = await TareasRepository.remove(id)
        console.log(data);
        if (!data.success) {
            return;
        }
        await init();

    } catch (exception) {
        console.log(exception);
    }
}

</script>