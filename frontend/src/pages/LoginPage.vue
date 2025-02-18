<template>
  <q-page class="flex flex-center column">
    <img
      src="https://avmb.com.br/wp-content/uploads/2023/06/Logo_MAIOR_Prancheta-1.png"
      alt="Logo"
      class="q-mb-md"
      style="max-width: 200px; max-height: 80px"
    />

    <q-card class="q-pa-md q-mt-lg" style="width: 400px">
      <q-card-section>
        <div class="text-h6 text-center">LOGIN</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="form.email"
            label="E-mail"
            type="email"
            :rules="[(val) => !!val || 'E-mail inválido']"
            required
          />

          <q-input
            v-model="form.password"
            label="Senha"
            type="password"
            :rules="[(val) => !!val || 'Senha inválida']"
            required
          />

          <q-btn type="submit" color="orange-9" label="Entrar" class="q-mt-md full-width" />

          <q-btn
            label="Cadastrar-se"
            color="primary"
            class="q-mt-md full-width bordered"
            @click="goToRegister"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const router = useRouter()
    const form = ref({
      email: '',
      password: '',
    })
    const $q = useQuasar()

    const onSubmit = async () => {
      try {
        const response = await api.post('/api/login', form.value)

        const { token, refreshToken, role } = response.data

        if (token && refreshToken && role) {
          localStorage.setItem('token', token)
          localStorage.setItem('refreshToken', refreshToken)
          localStorage.setItem('role', role)
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`

          if (role === 'ADMIN') {
            await router.push('/admin/access')
          } else {
            await router.push('/user/access')
          }
        }
      } catch (error) {
        console.error(error)
        $q.notify({
          type: 'warning',
          message: 'Erro! Seu login ainda não foi aceito por um Admnistrador.',
        })
      }
    }

    const goToRegister = () => {
      void router.push('/register')
    }

    return {
      form,
      onSubmit,
      goToRegister,
    }
  },
}
</script>
