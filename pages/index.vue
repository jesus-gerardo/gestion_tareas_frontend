<template>
    <div class="bg-gray-100 p-6">
        <UCard class="p-6 rounded-lg max-w-6xl mx-auto">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-gray-800">Lista de Tareas</h2>
                    <button
                        class="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition duration-300 text-xs"
                        @click="create">
                        Agregar
                    </button>
                </div>
            </template>

            <Placeholder class="h-32" />

            <template v-if="tareaList.length > 0">
                <listComponent v-for="tarea in tareaList" :key="tarea.id" :id-tarea="tarea.id" :title="tarea.titulo"
                    :descripcion="tarea.descripcion" :fecha-creacion="tarea.fecha_creacion"
                    :fecha-finalizacion="tarea.fecha_finalizacion" :estado="tarea.estado" @delete="destroy"
                    @update="update" />
            </template>

            <template v-else>
                <UAlert icon="i-heroicons-outline-warning" color="red" variant="soft"
                    description="No se encontraron tareas registradas" class="text-center" />
            </template>
        </UCard>
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
    router.push({ path: 'tarea/add' })
}

const update = (id: number) => {
    router.push({ path: `tarea/${id}` });
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