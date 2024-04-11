import Hotel from '@pages/Hotel'
import HotelList from '@pages/HotelList'
import Test from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotel/:id" element={<Hotel />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
