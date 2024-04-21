import { useAlertContext } from '@contexts/AlertContext'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import useUser from '@hooks/auth/useUser'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import Tag from '@shared/Tag'
import Text from '@shared/Text'
import addDelimiter from '@utils/addDelimiter'
import { stringify } from 'qs'
import { useNavigate } from 'react-router-dom'
import useRooms from './hooks/useRooms'

export default function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms({ hotelId })
  const user = useUser()
  const navigate = useNavigate()
  const { open } = useAlertContext()
  return (
    <Container>
      <Header justify="space-between" align="center">
        <Text bold typography="t4">
          객실정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금 포함
        </Text>
      </Header>
      <ul>
        {data?.map((room) => {
          const deadlineImminent = room.avaliableCount === 1
          const soldOut = room.avaliableCount === 0

          const params = stringify(
            {
              roomId: room.id,
              hotelId,
            },
            { addQueryPrefix: true },
          )
          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName}의 객실 이미지`}
                  css={imageStyles}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {deadlineImminent === true ? (
                        <>
                          <Spacing size={6} direction="horizontal" />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? '환불가능' : '환불불가',
                  )}
                />
              }
              right={
                <Button
                  size="medium"
                  disabled={soldOut}
                  onClick={() => {
                    if (user == null) {
                      open({
                        title: '로그인이 필요한 기능입니다.',
                        onButtonClick: () => navigate('/signin'),
                      })
                      return
                    }
                    navigate(`/schedule${params}`)
                  }}
                >
                  {soldOut === true ? '매진' : '선택'}
                </Button>
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}

const Container = styled.div`
  margin: 40px 0;
`

const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`
