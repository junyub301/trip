import AuthGuard from '@components/auth/AuthGuard'
import useLoadKakao from '@hooks/useLoadKakao'
import Hotel from '@pages/Hotel'
import HotelList from '@pages/HotelList'
import My from '@pages/My'
import Signin from '@pages/Signin'
import Test from '@pages/Test'
import Navbar from '@shared/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  useLoadKakao()
  return (
    <div className="App">
      <BrowserRouter>
        <AuthGuard>
          <Navbar />
          <Routes>
            <Route path="/" element={<HotelList />} />
            <Route path="/hotel/:id" element={<Hotel />} />
            <Route path="/my" element={<My />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </div>
  )
}

export default App
