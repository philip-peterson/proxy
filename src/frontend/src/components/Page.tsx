import { createComponent } from 'react-fela'

const Frame = createComponent(() => ({
  width: '100%',
  height: '100%',
  display: 'block',
  background: 'black',
  overflow: 'auto',
}))

export const Page = ({ children }: React.PropsWithChildren) => {
  return <Frame>{children}</Frame>
}
