import SessionList from '../src/components/Sessions/SessionList'
import NavBar from '../src/components/NavBar'
import { UserProvider } from '../src/context/User'

export default function SessionSelectPage() {
  return (
    <UserProvider>
      <NavBar />
      <SessionList />
    </UserProvider>
  )
}
