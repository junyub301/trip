import Carousel from '@components/hotel/Carousel'
import Contents from '@components/hotel/Contents'
import useHotel from '@components/hotel/hooks/useHotel'
import Top from '@shared/Top'
import { useParams } from 'react-router-dom'

export default function Hotel() {
  const { id } = useParams() as { id: string }
  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) return <div>Loading...</div>
  const { name, comment, images, contents } = data
  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <Contents contents={contents} />
    </div>
  )
}
