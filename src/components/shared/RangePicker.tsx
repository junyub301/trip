import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  parseISO,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker, DateRange } from 'react-day-picker'

interface RangePickerProps {
  startDate?: string | undefined
  endDate?: string | undefined
  onChange: (dateRange: { from?: string; to?: string; nights: number }) => void
}

export default function RangePicker({
  startDate,
  endDate,
  onChange,
}: RangePickerProps) {
  const today = new Date()
  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null) return
    console.log('🚀 ~ handleDayClick ~ dateRange:', dateRange)

    const { from, to } = dateRange

    if (from && to && isSameDay(from, to)) return

    onChange({
      from: from != null ? format(from, 'yyyy-MM-dd') : undefined,
      to: to != null ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    })
  }

  const selected = {
    from: startDate != null ? parseISO(startDate) : undefined,
    to: endDate != null ? parseISO(endDate) : undefined,
  }

  return (
    <Container>
      <DayPicker
        mode="range"
        numberOfMonths={5}
        locale={ko}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selected}
        disabled={{
          before: addDays(new Date(), +1),
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 80px;
  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 60px 0px 30px;
  }
  .rdp-caption {
    position: absolute;
    top: 25px;
    left: 20px;
    color: ${colors.black};
    font-weight: bold;
  }
  .rdp-nav {
    display: none;
  }
  .rdp-table {
    width: 100%;
  }
  .rdp-head {
    .rdp-head_row {
      font-size: 12px;
      height: 45px;
      color: ${colors.gray400};
      font-weight: bold;
    }
  }
  .rdp-body {
    .rdp-row {
      height: 45px;
    }
  }
  .rdp-cell {
    .rdp-button {
      position: relative;
      width: 100%;
      line-height: 45px;

      &:disabled {
        color: ${colors.gray200};
      }
    }
    .rdp-day_range_start,
    .rdp-day_range_end {
      color: ${colors.white};
      &::after {
        z-index: -1;
        display: block;
        width: calc(100% - 1px);
        height: 45px;
        position: absolute;
        top: 50%;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${colors.blue};
        content: '';
      }
    }
  }
  .rdp-day_selected {
    background-color: ${colors.blue100};
  }
`
