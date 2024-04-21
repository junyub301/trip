import { useAlertContext } from '@contexts/AlertContext'
import { getHotelWithRoom } from '@remote/hotel'
import { useQuery } from 'react-query'

export default function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const { open } = useAlertContext()
  const { data, isLoading } = useQuery(
    ['hotelWithRoom', hotelId, roomId],
    () => getHotelWithRoom({ hotelId, roomId }),
    {
      onSuccess: ({ room }) => {
        if (room.avaliableCount === 0) {
          open({
            title: '객실이 매진되었습니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
        }
      },
    },
  )

  return { data, isLoading }
}
