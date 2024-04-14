import { COLLECTIONS } from '@constants'
import { Room } from '@models/room'
import { collection, doc, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export async function getRooms(hotelId: string) {
  const snapshot = await getDocs(
    collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
  )

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }))
}
