import { Hotel, ReservationForm } from '@models/hotel'
import FixedBottomButton from '@shared/FixedBottomButton'
import Select from '@shared/Select'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import TextField from '@shared/TextField'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

export default function Form({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel['forms']
  onSubmit: () => void
  buttonLabel: string
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextField
            key={form.id}
            label={form.label}
            hasError={errors[form.id] != null}
            helpMessage={
              (errors[form.id]?.message as string) || form.helpMessage
            }
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else if (form.type === 'SELECT') {
        return (
          <Select
            key={form.id}
            label={form.label}
            options={form.options}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else {
        return null
      }
    },
    [register, errors],
  )

  const VALIDATION_MESSAGE_MAP: {
    [key: string]: {
      value: RegExp
      message: string
    }
  } = {
    name: {
      value: /^[가-힣]+$/,
      message: '한글명을 확인해주세요',
    },
    email: {
      value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: '이메일 형식을 확인해주세요',
    },
    phone: {
      value: /^\d+$/,
      message: '휴대전화번호를 확인해주세요',
    },
  }

  return (
    <div style={{ padding: 24 }}>
      <Text bold>예약정보</Text>
      <form>{forms.map((form) => component(form))}</form>
      <Spacing size={80} />
      <FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}
