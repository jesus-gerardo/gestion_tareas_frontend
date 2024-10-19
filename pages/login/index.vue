<template>
    <div class="h-screen bg-gray-100 flex items-center justify-center">

        <!-- Card del Login -->
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

            <form action="#" method="post">
                <!-- Campo de Usuario -->
                <div class="mb-4">
                    <label for="username" class="block text-gray-600 mb-2">Correo</label>
                    <input type="text" v-model="email" placeholder="Ingresa tu correo" required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Campo de Contraseña -->
                <div class="mb-6">
                    <label for="password" class="block text-gray-600 mb-2">Contraseña</label>
                    <input type="password" v-model="password" placeholder="Ingresa tu contraseña" required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Botón de Ingreso -->
                <button type="button" @click="login"
                    class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">
                    Ingresar
                </button>
            </form>
        </div>

    </div>
</template>

<script lang="ts" setup>

import { ref, onBeforeMount } from 'vue';

import { AuthRepository } from '~/src/repository';

const email = ref(null);
const password = ref(null);

onBeforeMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
        navigateTo("/")
    }
})
const login = async () => {
    try {
        const { data } = await AuthRepository.login({
            email: email.value, password: password.value
        })
        localStorage.setItem('token', data.token);
        navigateTo("/")
    } catch (exception) {
        console.log(exception);
    }
}

</script>