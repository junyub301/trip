import { EVENTS, HOTEL, HOTEL_NAMES, IMAGES, ROOMS } from '@/mock/data'
import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function HotelLIstAddButton() {
  const batch = writeBatch(store)

  const handleButtonClick = () => {
    const hotels = HOTEL_NAMES.map((hotelName, idx) => ({
      name: hotelName,
      mainImageURl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
      images: IMAGES,
      price: random(130000, 200000),
      startRating: random(1, 5),
      ...HOTEL,
      ...(EVENTS[idx] != null && { events: EVENTS[idx] }),
    }))

    hotels.forEach((hotel) => {
      const hotelDocRef = doc(collection(store, COLLECTIONS.HOTEL))
      batch.set(hotelDocRef, hotel)
      ROOMS.forEach((room) => {
        const subDocRef = doc(collection(hotelDocRef, COLLECTIONS.ROOM))
        batch.set(subDocRef, room)
      })
    })

    batch.commit()
  }
  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>
}
