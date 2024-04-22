import { FORMS } from '@/mock/data'
import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import Button from '@shared/Button'
import { collection, getDocs, writeBatch } from 'firebase/firestore'

export default function HotelFormAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))
    snapshot.docs.forEach((hotel) => {
      batch.update(hotel.ref, { forms: FORMS })
    })
    await batch.commit()
    alert('폼 데이터 추가 완료')
  }

  return <Button onClick={handleButtonClick}>폼 데이터 추가</Button>
}
