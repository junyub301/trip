import useUser from '@hooks/auth/useUser'
import { getReservations } from '@remote/reservationt'
import { useQuery } from 'react-query'

export default function useReservations() {
  const user = useUser()

  const { data, isLoading } = useQuery(
    ['reservations', user?.uid],
    () => getReservations({ userId: user?.uid as string }),
    { enabled: user != null },
  )

  return { data, isLoading }
}
