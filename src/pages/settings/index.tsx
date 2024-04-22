import ListRow from '@shared/ListRow'
import { Link } from 'react-router-dom'

export default function SettingsPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/settings/like">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="찜하기" subTitle="찜한 호텔 순서 변경" />
              }
              withArrow
            />
          </Link>
        </li>
        <li>
          <Link to="/reservation/list">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="예약 목록" subTitle="예약목록 보러가기" />
              }
              withArrow
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}
