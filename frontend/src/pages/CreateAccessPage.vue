<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md text-center q-mt-md">Criar Acesso</div>
    <q-form @submit="onSubmit" class="q-gutter-md shadow-2 q-pa-sm q-pa-">
      <q-select
        v-model="form.userId"
        :options="users"
        option-label="name"
        option-value="id"
        label="Selecione o usuário"
        emit-value
        map-options
        required
      />

      <q-select
        v-model="form.resourceId"
        :options="resources"
        option-label="name"
        option-value="id"
        label="Selecione o recurso"
        emit-value
        map-options
        required
      />

      <q-input
        v-model="form.expirationDate"
        type="datetime-local"
        label="Data de expiração"
        required
      />

      <q-btn type="submit" color="orange-9" label="Criar Acesso" class="q-mt-md full-width" />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

interface User {
  id: string
  name: string
}

interface Resource {
  id: string
  name: string
}

interface Form {
  userId: string
  resourceId: string
  expirationDate: string
}

export default {
  setup() {
    const $q = useQuasar()
    const users = ref<User[]>([])
    const resources = ref<Resource[]>([])
    const form = ref<Form>({
      userId: '',
      resourceId: '',
      expirationDate: '',
    })

    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/users')
        users.value = response.data
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      }
    }

    const fetchResources = async () => {
      try {
        const response = await api.get('/api/resources')
        resources.value = response.data
      } catch (error) {
        console.error('Erro ao buscar recursos:', error)
      }
    }

    const onSubmit = async () => {
      if (!form.value.userId || !form.value.resourceId || !form.value.expirationDate) {
        $q.notify({ type: 'warning', message: 'Preencha os campos corretamente' })
        return
      }

      try {
        await api.post('/api/access/new', {
          user_id: form.value.userId,
          resource_id: form.value.resourceId,
          expirationDate: new Date(form.value.expirationDate).toISOString(),
        })
        $q.notify({ type: 'positive', message: 'Acesso criado com sucesso' })
        form.value = { userId: '', resourceId: '', expirationDate: '' }
      } catch (error) {
        console.error('Erro ao criar acesso:', error)
        $q.notify({ type: 'negative', message: 'Erro ao criar acesso. Reveja os dados inseridos.' })
      }
    }

    onMounted(() => {
      void fetchUsers()
      void fetchResources()
    })

    return {
      users,
      resources,
      form,
      onSubmit,
    }
  },
}
</script>

<style scoped>
.q-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
