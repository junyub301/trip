import React from 'react'
import useHotels from '@components/hotelList/hooks/useHotels'
import HotelItem from '@components/hotelList/HotelItem'
import Top from '@shared/Top'
import Spacing from '@shared/Spacing'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function HotelList() {
  const { data: hotels, hasNextPage, loadMore } = useHotels()

  return (
    <div>
      <Top title="인기호텔" subTitle="호텔부터 펜션까지 최저가" />
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {hotels?.map((hotel, idx) => (
            <React.Fragment key={hotel.id}>
              <HotelItem hotel={hotel} key={hotel.id} />
              {hotels.length - 1 === idx ? null : (
                <Spacing
                  backgroundColor="gray100"
                  size={8}
                  style={{ margin: '20px 0' }}
                />
              )}
            </React.Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
