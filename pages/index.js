import SessionList from '../src/components/Sessions/SessionList'
import { UserProvider } from '../src/context/User'

import NavBar from '../src/components/NavBar'

export default function Home() {
  return (
    <UserProvider>
      <NavBar />
      <SessionList />
    </UserProvider>
  )
}
