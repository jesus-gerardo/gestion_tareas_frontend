<template>
    <UCard class="rounded-lg shadow-md mt-5">
        <template #header>
            <div class="flex justify-between items-center">
                <div class="flex-1">

                    <div class="flex">
                        <h3 class="text-xl font-medium text-gray-800">{{ props.title }}</h3>
                        <UBadge color="white" size="xs" class="ml-2"><span>{{ props.estado }}</span></UBadge>
                    </div>

                    <p class="text-sm text-gray-500">
                        <span class="font-semibold">{{ props.fechaCreacion }}</span>
                        -
                        <span class="font-semibold">{{ props.fechaFinalizacion }}</span>
                    </p>
                </div>

                <UDropdown v-model:open="open" :items="items" :popper="{ placement: 'bottom-start' }">
                    <UButton color="white" label="Acciones" />
                </UDropdown>
            </div>
        </template>

        <p class="text-gray-600">{{ props.descripcion ?? 'Sin descripción' }}</p>
    </UCard>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['delete', 'update', 'status']);
const props = defineProps<{
    idTarea?: number;
    title?: string;
    descripcion?: string;
    estado?: string;
    fechaCreacion?: string;
    fechaFinalizacion?: string;
}>();

const open = ref(false)
const items = [
    [
        {
            label: 'Editar',
            click: () => { emit('update', props.idTarea) }
        },
        {
            label: 'Eliminar',
            click: () => { emit('delete', props.idTarea) }
        },
        {
            label: 'cambiar estado',
            click: () => { emit('status', { id_tarea: props.idTarea, estado: props.estado }) }
        }
    ]
]

</script>