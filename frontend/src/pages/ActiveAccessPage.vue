<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">Acessos Ativos</div>

    <q-table
      :rows="activeAccesses"
      :columns="columns"
      row-key="id"
      :loading="loading"
      no-data-label="Nenhum acesso ativo disponível."
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

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="red"
            label="Revogar"
            size="sm"
            :disable="revokingId === props.row.id"
            @click="revokeAccess(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue'
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
    const revokingId = ref<string | null>(null)

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
      { name: 'actions', label: 'Ações', field: 'actions', align: 'center' as const },
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

    const revokeAccess = async (accessId: string) => {
      try {
        revokingId.value = accessId
        await api.put(`/api/access/revoke/${accessId}`)

        accesses.value = accesses.value.map((access) =>
          access.id === accessId ? { ...access, status: 'Revogado' } : access,
        )
      } catch (error) {
        console.error('Erro ao revogar acesso:', error)
        console.log(revokingId)
      } finally {
        revokingId.value = null
      }
    }

    const activeAccesses = computed(() => {
      return accesses.value.filter((access) => access.status === 'Ativo')
    })

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
          return 'orange'
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
      activeAccesses,
      columns,
      loading,
      revokingId,
      getStatusColor,
      isAboutToExpire,
      formatDate,
      revokeAccess,
    }
  },
}
</script>

<style scoped>
.text-red {
  color: red;
  font-weight: bold;
}
</style>
