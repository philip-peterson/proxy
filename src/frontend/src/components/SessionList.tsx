import { createComponent } from 'react-fela'

const Container = createComponent(() => ({
}))

type Session = {
    id: string
    name?: string
}

export const SessionList = () => {
  const sessions: Session[] = []
  return <Container>{sessions.map((sess, i) => {
    return <div key={sess.id}>#{i} {sess.name ? `(${sess.name})` : ''}</div>
  })}</Container>
}
