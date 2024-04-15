import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import Button from '@shared/Button'
import { collection, getDocs, writeBatch } from 'firebase/firestore'

export default function RecommendHotelButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))

    snapshot.docs.forEach((hotel) => {
      const recommendHotelList = []
      for (let doc of snapshot.docs) {
        if (recommendHotelList.length === 5) {
          break
        }
        if (doc.id !== hotel.id) {
          recommendHotelList.push(doc.id)
        }
      }
      batch.update(hotel.ref, { recommendHotels: recommendHotelList })
    })

    await batch.commit()
    alert('업데이트가 완료되었습니다.')
  }
  return <Button onClick={handleButtonClick}>추천호텔 데이터 추가하기</Button>
}
