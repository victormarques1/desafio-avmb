<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">Lista de Usuários</div>

    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      :loading="loading"
      no-data-label="Nenhum usuário disponível."
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="getStatusColor(props.row.status)">
            {{ translateStatus(props.row.status) }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            color="green"
            label="Aprovar"
            v-if="props.row.status === 'PENDING'"
            @click="updateStatus(props.row.id, 'APPROVED')"
            class="q-mr-sm"
          />
          <q-btn
            size="sm"
            color="red"
            label="Revogar"
            v-if="props.row.status === 'PENDING'"
            @click="updateStatus(props.row.id, 'REJECTED')"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

interface User {
  id: string
  name: string
  email: string
  status: string
}

export default {
  setup() {
    const users = ref<User[]>([])
    const loading = ref(true)

    const columns = [
      { name: 'name', label: 'Nome', field: 'name', align: 'left' as const },
      { name: 'email', label: 'E-mail', field: 'email', align: 'left' as const },
      { name: 'status', label: 'Status', field: 'status', align: 'left' as const },
      { name: 'actions', label: 'Ações', field: 'actions', align: 'center' as const },
    ]

    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/users')
        users.value = response.data
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      } finally {
        loading.value = false
      }
    }

    const updateStatus = async (userId: string, newStatus: string) => {
      try {
        await api.put(`/api/users/${userId}`, { status: newStatus })
        users.value = users.value.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user,
        )
      } catch (error) {
        console.error(`Erro ao atualizar status para ${newStatus}:`, error)
      }
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'APPROVED':
          return 'green'
        case 'PENDING':
          return 'grey'
        case 'REJECTED':
          return 'red'
      }
    }

    const translateStatus = (status: string) => {
      switch (status) {
        case 'APPROVED':
          return 'Aprovado'
        case 'PENDING':
          return 'Pendente'
        case 'REJECTED':
          return 'Recusado'
        default:
          return 'Desconhecido'
      }
    }

    onMounted(() => {
      void fetchUsers()
    })

    return {
      users,
      columns,
      loading,
      updateStatus,
      getStatusColor,
      translateStatus,
    }
  },
}
</script>
