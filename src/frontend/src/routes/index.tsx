import { createFileRoute } from '@tanstack/react-router'
import { useSession } from '../lib/auth-client'
import { Button } from '@base-ui/react/button';
import { RendererProvider, createComponent } from 'react-fela'

import createRenderer from '../lib/renderer'

const renderer = createRenderer()

export const Route = createFileRoute('/')({
  component: Index,
})

const section = () => ({
  margin: '0 auto',
  fontSize: '1rem',
  display: 'block',
  width: '30.5rem',
  height: '30.5rem',
  background: 'blue'
})

const LoginBox = createComponent(section)


function Index() {
  return (
    <html>
      <body>
        <RendererProvider renderer={renderer}>
          <MyApp />
          <LoginBox>
            Hello styles
          </LoginBox>
        </RendererProvider>
      </body>
    </html>
  )
}

function MyApp() {
  const { data: session, isPending, error } = useSession()

  if (isPending) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>ERROR: {`${error}`}</div>
  }

  return (
    <div>
      <Button native={false}>Let's go</Button>

      <h3>Welcome Home!</h3>

      {session && <div>Hello {session.user?.name ?? `${session.user}`}</div>}
    </div>
  )
}
