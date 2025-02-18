<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">Criar um recurso</div>

    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input v-model="form.name" label="Nome do Recurso" required autofocus />
      <q-input
        v-model="form.description"
        label="Descrição"
        type="textarea"
        hint="Descrição opcional"
        rows="4"
      />
      <q-btn type="submit" color="orange-9" label="Criar Recurso" />
    </q-form>

    <div class="text-h4 q-mb-md q-mt-lg">Recursos</div>
    <q-table
      :rows="resources"
      :columns="columns"
      row-key="id"
      :loading="loading"
      no-data-label="Nenhum recurso disponível."
      class="q-mt-md"
    >
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

interface Resource {
  id: string
  name: string
  description: string
}

interface Form {
  name: string
  description: string
}

export default {
  setup() {
    const resources = ref<Resource[]>([])
    const loading = ref(true)
    const form = ref<Form>({
      name: '',
      description: '',
    })
    const $q = useQuasar()

    const columns = [
      { name: 'name', label: 'Nome', field: 'name', align: 'left' as const },
      { name: 'description', label: 'Descrição', field: 'description', align: 'left' as const },
    ]

    const fetchResources = async () => {
      try {
        const response = await api.get('/api/resources')
        resources.value = response.data
      } catch (error) {
        console.error('Erro ao buscar recursos:', error)
      } finally {
        loading.value = false
      }
    }

    const onSubmit = async () => {
      if (!form.value.name) {
        $q.notify({ type: 'warning', message: 'Por favor, preencha o nome do recurso.' })
        return
      }

      try {
        const response = await api.post('/api/resources/new', {
          name: form.value.name,
          description: form.value.description || '',
        })

        resources.value.push(response.data)
        form.value = { name: '', description: '' }
        $q.notify({ type: 'positive', message: 'Recurso criado com sucesso!' })
      } catch (error) {
        console.error('Erro ao criar recurso:', error)
        $q.notify({ type: 'negative', message: 'Erro ao criar recurso' })
      }
    }

    onMounted(() => {
      void fetchResources()
    })

    return {
      resources,
      columns,
      loading,
      form,
      onSubmit,
    }
  },
}
</script>
