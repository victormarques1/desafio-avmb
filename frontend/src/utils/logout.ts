import type { NavigationGuardNext } from 'vue-router'

export function logout(next?: NavigationGuardNext) {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('role')

  if (next) {
    next('/')
  } else {
    window.location.href = '/'
  }
}
