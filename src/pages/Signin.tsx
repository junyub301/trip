import useGoogleSignin from '@hooks/useGoogleSignin'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'

export default function Signin() {
  const { signin } = useGoogleSignin()
  return (
    <Flex direction="column" align="center" style={{ padding: 24 }}>
      <Spacing size={100} />
      <img
        src="https://cdn4.iconfinder.com/data/icons/doodle-4/158/send-64.png"
        width={120}
        height={120}
        alt=""
      />
      <Spacing size={60} />
      <Button size="medium" onClick={signin}>
        <Flex align="center" justify="center">
          <img
            src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-64.png"
            width={20}
            height={20}
            alt=""
          />
          <Spacing direction="horizontal" size={4} />
          Google 로그인
        </Flex>
      </Button>
    </Flex>
  )
}
