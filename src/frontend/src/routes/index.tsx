import { Theme } from '@radix-ui/themes'

import { createFileRoute } from '@tanstack/react-router'
import { useSession } from '../lib/auth-client'
export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <html>
      <body>
        <Theme>
          <MyApp />
        </Theme>
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
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {session && <div>Hello {session.user?.name ?? `${session.user}`}</div>}
    </div>
  )
}
