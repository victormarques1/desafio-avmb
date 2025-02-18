import { logout } from 'src/utils/logout'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function isAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    logout(next)
  } else {
    next()
  }
}

export function isAdmin(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const role = localStorage.getItem('role')

  if (role === 'ADMIN') {
    next()
  } else {
    logout(next)
  }
}

export function redirectIfAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const isAuthenticated = !!localStorage.getItem('token')

  if (isAuthenticated) {
    logout(next)
  } else {
    next()
  }
}
