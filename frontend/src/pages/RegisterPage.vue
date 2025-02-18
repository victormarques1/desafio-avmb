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
        <div class="text-h6">CADASTRE-SE</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="form.name"
            label="Nome"
            :rules="[
              (val) => !!val || 'O nome é obrigatório',
              (val) => val.length >= 5 || 'Insira um nome válido',
            ]"
            required
          />
          <q-input
            v-model="form.email"
            label="E-mail"
            type="email"
            :rules="[
              (val) => !!val || 'O e-mail é obrigatório',
              (val) => isValidEmail(val) || 'E-mail inválido',
            ]"
            required
          />
          <q-input
            v-model="form.password"
            label="Senha"
            type="password"
            :rules="[
              (val) => !!val || 'A senha é obrigatória',
              (val) => val.length >= 6 || 'A senha deve ter pelo menos 6 caracteres',
            ]"
            required
          />
          <q-btn type="submit" color="orange-9" label="Cadastrar" class="q-mt-md full-width" />
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
      name: '',
      email: '',
      password: '',
    })
    const $q = useQuasar()

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    const onSubmit = async () => {
      try {
        await api.post('/api/users/new', form.value)
        $q.notify({ type: 'positive', message: 'Cadastro criado com sucesso!' })
        await router.push('/')
      } catch (error) {
        console.error('Erro ao cadastrar:', error)
      }
    }

    return {
      form,
      onSubmit,
      isValidEmail,
    }
  },
}
</script>
