import { COLLECTIONS } from '@constants'
import { auth, store } from '@remote/firebase'
import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useGoogleSignin() {
  const navigate = useNavigate()
  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    try {
      const { user } = await signInWithPopup(auth, provider)

      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
      )
      if (userSnapshot.exists()) {
        navigate('/')
      } else {
        const newUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
        await setDoc(
          doc(collection(store, COLLECTIONS.USER), user.uid),
          newUser,
        )

        navigate('/')
      }
    } catch (error) {
      console.log('🚀 ~ signin ~ error:', error)
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') return
      }
      throw new Error('fail to signin')
    }
  }, [navigate])

  const signout = useCallback(() => {
    signOut(auth)
  }, [])
  return { signin, signout }
}
