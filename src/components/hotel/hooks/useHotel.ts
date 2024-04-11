import { getHotel } from '@remote/hotel'
import { useQuery } from 'react-query'

export default function useHotel({ id }: { id: string }) {
  return useQuery(['hotel', id], () => getHotel(id))
}
