import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { MouseEvent } from 'react'
import Flex from './Flex'
import Text from './Text'

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} />
      <Text bold>{children}</Text>
    </Flex>
  )
}
function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  link?: string
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li">
      <Flex onClick={(e) => onChange(e, !checked)}>
        <IconCheckWithoutCircle checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      )}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

function IconCheck({ checked }: { checked: boolean }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 512 512"
      fill={checked ? colors.blue : colors.gray}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M335 175L224 286.1L176.1 239c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l64 64C211.7 341.7 217.8 344 224 344s12.28-2.344 16.97-7.031l128-128c9.375-9.375 9.375-24.56 0-33.94S344.4 165.7 335 175zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" />
    </svg>
  )
}

function IconCheckWithoutCircle({ checked }: { checked: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={checked ? colors.blue : colors.gray}
    >
      <path
        d="M21.4144 5.99991L9.00015 18.4141L2.58594 11.9999L4.00015 10.5857L9.00015 15.5857L20.0002 4.58569L21.4144 5.99991Z"
        fill="current"
      />
    </svg>
  )
}

const agreementContainerStyles = css`
  padding: 24px;
  & li {
    cursor: pointer;
  }
`

export default Agreement
