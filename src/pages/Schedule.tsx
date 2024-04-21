import FixedBottomButton from '@shared/FixedBottomButton'
import RangePicker from '@shared/RangePicker'
import { parse, stringify } from 'qs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SchedulePage() {
  const navigate = useNavigate()
  const { roomId, hotelId } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { roomId: string; hotelId: string }

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  })
  useEffect(() => {
    if (roomId === '' || hotelId === '') {
      window.history.back()
    }
  }, [roomId, hotelId])

  const moveToReservationPage = () => {
    const params = stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      { addQueryPrefix: true },
    )
    navigate(`/reservation${params}`)
  }

  const isSubmit =
    selectedDate.startDate != null && selectedDate.endDate != null

  const buttonLabel = isSubmit
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '예약 날짜를 선택해주세요.'

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          })
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={!isSubmit}
        onClick={moveToReservationPage}
      />
    </div>
  )
}
