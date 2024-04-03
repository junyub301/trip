export interface Hotel {
  comment: string
  contents: string
  id: string
  images: string[]
  location: { directions: string; pointGeolocation: { x: number; y: number } }
  mainImageURl: string
  name: string
  price: number
  startRating: number
}
