import AuthGuard from '@components/auth/AuthGuard'
import PrivateRoute from '@components/auth/PrivateRoute'
import useLoadKakao from '@hooks/useLoadKakao'
import Hotel from '@pages/Hotel'
import HotelList from '@pages/HotelList'
import My from '@pages/My'
import SettingsPage from '@pages/settings'
import LikePage from '@pages/settings/like'
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
            <Route
              path="/my"
              element={
                <PrivateRoute>
                  <My />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/test" element={<Test />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings/like"
              element={
                <PrivateRoute>
                  <LikePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </div>
  )
}

export default App
