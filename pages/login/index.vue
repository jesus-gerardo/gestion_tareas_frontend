<template>
    <div class="h-screen bg-gray-100 flex items-center justify-center">

        <!-- Card del Login -->
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

            <form action="#" method="post">
                <!-- Campo de Usuario -->
                <div class="mb-4">
                    <label for="username" class="block text-gray-600 mb-2">Usuario</label>
                    <input type="text" id="username" name="username" placeholder="Ingresa tu usuario" required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Campo de Contraseña -->
                <div class="mb-6">
                    <label for="password" class="block text-gray-600 mb-2">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Botón de Ingreso -->
                <button type="submit"
                    class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">
                    Ingresar
                </button>
            </form>

            <!-- Enlace de Contraseña Olvidada -->
            <div class="mt-4 text-center">
                <a href="#" class="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>

</script>