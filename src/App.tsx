import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useLoadKakao from '@hooks/useLoadKakao'

const AuthGuard = lazy(() => import('@components/auth/AuthGuard'))
const PrivateRoute = lazy(() => import('@components/auth/PrivateRoute'))
const Hotel = lazy(() => import('@pages/Hotel'))
const HotelList = lazy(() => import('@pages/HotelList'))
const My = lazy(() => import('@pages/My'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const ReservationDonePage = lazy(() => import('@pages/ReservationDone'))
const ReservationListPage = lazy(() => import('@pages/ReservationList'))
const SchedulePage = lazy(() => import('@pages/Schedule'))
const SettingsPage = lazy(() => import('@pages/settings'))
const LikePage = lazy(() => import('@pages/settings/like'))
const Signin = lazy(() => import('@pages/Signin'))
const Test = lazy(() => import('@pages/Test'))
const Navbar = lazy(() => import('@shared/Navbar'))

function App() {
  useLoadKakao()
  return (
    <Suspense fallback={<></>}>
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
            <Route
              path="/schedule"
              element={
                <PrivateRoute>
                  <SchedulePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation"
              element={
                <PrivateRoute>
                  <ReservationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation/done"
              element={
                <PrivateRoute>
                  <ReservationDonePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation/list"
              element={
                <PrivateRoute>
                  <ReservationListPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
