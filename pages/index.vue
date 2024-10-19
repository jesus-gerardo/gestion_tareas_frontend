<template>
    <Header />

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
                <UAlert color="blue" variant="soft" icon="i-heroicons-exclamation-circle"
                    description="Arrastre y suelte las tarjetas en el orden deseado" class="text-center" />

                <draggable v-model="tareaList" item-key="id" class="list-group" ghost-class="ghost" @end="onDragEnd">
                    <template #item="{ element }">
                        <listComponent :id-tarea="element.id" :title="`#${element.order} ${element.titulo}`"
                            :descripcion="element.descripcion" :fecha-creacion="element.fecha_creacion"
                            :imagen="element.picture_url" :fecha-finalizacion="element.fecha_finalizacion"
                            :estado="element.estado" @delete="destroy" @update="update" @status="change" />
                    </template>
                </draggable>
            </template>

            <template v-else>
                <UAlert icon="i-heroicons-exclamation-triangle" color="red" variant="soft"
                    description="No se encontraron tareas registradas" class="text-center" />
            </template>
        </UCard>
    </div>

    <UModal v-model="isOpen" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Cambiar Estado
                    </h3>

                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>
            </template>

            <!-- Campo de Fecha de Creación -->
            <div class="mb-4">
                <label for="fechaCreacion" class="block text-sm font-medium text-gray-700">Estado</label>
                <USelect v-model="store.estado" :options="['pendiente', 'progreso', 'completado']" size="lg" />
            </div>

            <template #footer>
                <div class="flex justify-end">
                    <button type="button" @click="isOpen = false"
                        class="mr-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-300">
                        cancelar
                    </button>

                    <button type="button" @click="save"
                        class=" px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                        Guardar
                    </button>
                </div>
            </template>
            <Placeholder class="h-32" />
        </UCard>
    </UModal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import draggable from 'vuedraggable'
import { TareaStore } from '~/src/store/TareasStore';

// components
import listComponent from '@/components/list.component.vue';
import Header from '~/src/layout/header.vue';

// repository
import { TareasRepository } from '@/repository';


// attribute
const tareaList: any = ref([]);
const router = useRouter();
const isOpen = ref(false)
const store = TareaStore()

onMounted(() => {
    init()
});

const init = async () => {
    const { data } = await TareasRepository.findAll();
    tareaList.value = data;
}

const create = () => {
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

const change = async ({ id_tarea, estado }) => {
    store.setTareaId(id_tarea);
    store.setEstado(estado);
    isOpen.value = true;
}

const onDragEnd = async () => {
    try {
        const newOrder = tareaList.value.map(({ id }, i) => {
            return {
                id,
                order: i
            }
        })
        await ordenamiento(newOrder);
        // Realizamos la petición al backend para guardar el nuevo orden
    } catch (error) {
        console.error(error);
    }
};

const ordenamiento = async (payload) => {
    try {
        const { data } = await TareasRepository.ordenar({ list: payload })
        if (!data.success) {
            return;
        }
        await init();
    } catch (exception) {
        console.error(exception);
    }
}

const save = async () => {
    try {
        const { data } = await TareasRepository.cambio(store.tarea_id, { estado: store.estado });
        if (!data.success) {
            return;
        }
        isOpen.value = false;
        await init();
    } catch (exception) {
        console.error(exception);
    }
}

</script>