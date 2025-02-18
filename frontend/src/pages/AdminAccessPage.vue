<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">Lista de Acessos</div>

    <q-table
      :rows="accesses"
      :columns="columns"
      row-key="id"
      :loading="loading"
      no-data-label="Nenhum acesso disponível."
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="getStatusColor(props.row.status)">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-expirationDate="props">
        <q-td :props="props" :class="{ 'text-red': isAboutToExpire(props.row.expirationDate) }">
          {{ formatDate(props.row.expirationDate) }}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

interface Access {
  id: string
  userName: string
  resourceName: string
  expirationDate: string
  status: string
}

export default {
  setup() {
    const accesses = ref<Access[]>([])
    const loading = ref(true)

    const columns = [
      { name: 'userName', label: 'Usuário', field: 'userName', align: 'left' as const },
      { name: 'resourceName', label: 'Recurso', field: 'resourceName', align: 'left' as const },
      {
        name: 'expirationDate',
        label: 'Data de Expiração',
        field: 'expirationDate',
        align: 'left' as const,
      },
      { name: 'status', label: 'Status', field: 'status', align: 'left' as const },
    ]

    const fetchAllAccesses = async () => {
      try {
        const response = await api.get('/api/access/all')
        accesses.value = response.data.map((access: Access) => ({
          ...access,
          expirationDate: new Date(access.expirationDate).toISOString(),
          status: translateStatus(access.status),
        }))
      } catch (error) {
        console.error('Erro ao buscar acessos:', error)
      } finally {
        loading.value = false
      }
    }

    const translateStatus = (status: string) => {
      switch (status) {
        case 'ACTIVE':
          return 'Ativo'
        case 'EXPIRED':
          return 'Expirado'
        case 'REVOKED':
          return 'Revogado'
        default:
          return 'Desconhecido'
      }
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Ativo':
          return 'green'
        case 'Expirado':
          return 'red'
        case 'Revogado':
          return 'grey'
        default:
          return 'grey'
      }
    }

    const isAboutToExpire = (expirationDate: string) => {
      const now = new Date()
      const expiration = new Date(expirationDate)
      const timeDifference = expiration.getTime() - now.getTime()
      return timeDifference > 0 && timeDifference < 60 * 60 * 1000
    }

    const formatDate = (date: string) => {
      return new Date(date).toLocaleString()
    }

    onMounted(() => {
      void fetchAllAccesses()
    })

    return {
      accesses,
      columns,
      loading,
      getStatusColor,
      isAboutToExpire,
      formatDate,
    }
  },
}
</script>
