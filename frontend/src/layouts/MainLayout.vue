<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-orange-9">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Sistema de Gestão de Acessos Temporários
        </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
          @click="toggleDarkMode"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

function toggleDarkMode() {
  $q.dark.toggle()
}
</script>
