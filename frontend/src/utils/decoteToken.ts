import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  id: string
  email: string
  role: string
}

const token = localStorage.getItem('token')

if (token) {
  const decodedToken = jwtDecode<DecodedToken>(token)
  const userRole = decodedToken.role
  console.log('Role do usuário:', userRole)
}
