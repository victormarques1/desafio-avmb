<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-orange-9 text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Sistema de Gestão de Acessos Temporários</q-toolbar-title>

        <q-btn flat dense round @click="toggleDarkMode">
          <q-icon :name="$q.dark.isActive ? 'dark_mode' : 'light_mode'" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="q-pa-md" :width="260">
      <q-list class="q-gutter-y-sm">
        <q-item class="q-mb-md flex flex-center">
          <q-item-section>
            <img
              src="https://avmb.com.br/wp-content/uploads/2023/06/Logo_MAIOR_Prancheta-1.png"
              alt="Logo"
              class="q-mx-auto"
              style="max-width: 80%; max-height: 60px"
            />
          </q-item-section>
        </q-item>

        <q-item v-ripple to="/admin/access" clickable class="q-pa-md">
          <q-item-section avatar>
            <q-icon name="list" color="primary" />
          </q-item-section>
          <q-item-section>Todos os Acessos</q-item-section>
        </q-item>

        <q-item v-ripple to="/admin/active-access" clickable class="q-pa-md">
          <q-item-section avatar>
            <q-icon name="lock_open" color="primary" />
          </q-item-section>
          <q-item-section>Acessos Ativos</q-item-section>
        </q-item>

        <q-item v-ripple to="/admin/create-access" clickable class="q-pa-md">
          <q-item-section avatar>
            <q-icon name="add" color="primary" />
          </q-item-section>
          <q-item-section>Criar Acesso</q-item-section>
        </q-item>

        <q-item v-ripple to="/admin/users" clickable class="q-pa-md rounded-borders">
          <q-item-section avatar>
            <q-icon name="people" color="primary" />
          </q-item-section>
          <q-item-section>Usuários</q-item-section>
        </q-item>

        <q-item v-ripple to="/admin/resources" clickable class="q-pa-md rounded-borders">
          <q-item-section avatar>
            <q-icon name="folder" color="primary" />
          </q-item-section>
          <q-item-section>Recursos</q-item-section>
        </q-item>

        <q-item v-ripple @click="logout" clickable class="text-red-9 q-pa-md rounded-borders">
          <q-item-section avatar>
            <q-icon name="exit_to_app" color="red" />
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('role')
  window.location.href = '/'
}

function toggleDarkMode() {
  const newMode = !$q.dark.isActive
  $q.dark.set(newMode)
  localStorage.setItem('darkMode', newMode ? 'true' : 'false')
}

if (localStorage.getItem('darkMode') === 'true') {
  $q.dark.set(true)
}
</script>
