import { createComponent } from 'react-fela'

const Frame = createComponent(() => ({
  width: '100%',
  height: '100%',
  display: 'block',
  background: '#14002d', // purple
  overflow: 'auto',
  fontFamily: 'sans-serif',
}))

export const Page = ({ children }: React.PropsWithChildren) => {
  return <Frame>{children}</Frame>
}
