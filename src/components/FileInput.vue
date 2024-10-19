<template>
    <div class="flex flex-col items-center">
        <label for="file-upload"
            class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md transition duration-300 text-xs">
            Subir imagen
        </label>

        <input id="file-upload" type="file" class="hidden" accept="image/*" @change="handleFileChange" />

        <div v-if="imagePreview" class="mt-4">
            <img :src="imagePreview" alt="Vista previa" class="w-24 h-24 object-cover rounded-md" />
        </div>

        <span v-if="fileName" class="mt-2 text-sm text-gray-700">{{ fileName }}</span>

        <button v-if="imagePreview" @click="clearFile"
            class="mt-4 bg-red-500 text-white font-bold py-1 px-3 rounded text-xs">
            Limpiar imagen
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref, } from 'vue';

const emit = defineEmits(['file', 'clear', 'update:initialImage']);
const props = defineProps<{
    initialImage: string | null;
}>();

watch(() => props.initialImage, (val) => {
    imagePreview.value = val ?? null;
});

const fileName = ref<string | null>(null);
const imagePreview = ref<string | null>(props.initialImage);

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
        if (file.size > 5 * 1024 * 1024) { // solo se pueden archivos de 5 mb
            alert('El archivo es demasiado grande. Por favor selecciona uno de menos de 5MB.');
            return;
        }

        if (file.type.startsWith('image/')) {
            fileName.value = file.name;

            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.value = e.target?.result as string;
            };
            reader.readAsDataURL(file);
            emit('file', file);
        } else {
            alert('Por favor selecciona una imagen válida.');
        }
    }
};

const clearFile = () => {
    imagePreview.value = null;
    fileName.value = null;
    const input = document.getElementById('file-upload') as HTMLInputElement;
    input.value = '';
    emit('clear');
};
</script>
