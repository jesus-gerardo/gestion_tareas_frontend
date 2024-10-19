<template>
    <header class="bg-blue-600 text-black shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo / Título -->
                <div class="flex-shrink-0">
                    <h1 class="text-2xl font-bold">Prueba Técnica</h1>
                </div>

                <!-- Icono de Usuario o Login -->
                <div class="flex items-center space-x-4">
                    <!-- Usamos un ícono de usuario de Nuxt UI -->
                     <span>{{ store.user?.name }}</span>
                    <UTooltip text="Cerrar Sesion">
                        <UButton icon="i-heroicons-arrow-right-end-on-rectangle" size="xl" square color="black"
                            variant="link" @click="logout" />
                    </UTooltip>

                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { AuthRepository } from '~/src/repository';
import { userStore } from '@/store/userStore';

const store = userStore()
onMounted(() => {
    users()
})
const users = async () => {
    const { data } = await AuthRepository.user()
    store.setUser(data)
}

const logout = async () => {
    try {
        await AuthRepository.logout()
        localStorage.clear()
        navigateTo("/login")
    } catch (exception) {
        console.log(exception);
    }
}
</script>