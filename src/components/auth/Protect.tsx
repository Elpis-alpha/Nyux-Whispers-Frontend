import { useSelector } from "react-redux"

import BadRequest from "./BadRequest"

import Unauthorized from "./Unauthorized"

import WelcomePage from "./WelcomePage"


const Protect = ({ page: Page }: { page: () => JSX.Element }) => {

  // tested: has the data been fetched || available: is the user data available in the store
  const { tested, available } = useSelector((store: any) => store.conversation)


  // Different cases and their responses

  // Hasn't been tested (still fetching) and not available, render welcome (when the user lands)
  if (!tested && !available) return <WelcomePage />

  // Hasn't been tested (still fetching) and available, render welcome (this is impossible but still)
  else if (!tested && available) return <WelcomePage />

  // Has been tested (done fetching) but not available, render unauthorized (user isn't logged in)
  else if (tested && !available) return <Unauthorized />

  // Has been tested (done fetching) and available, render what is passed in (user is logged in and data has been fetched)
  else if (tested && available) return <Page />

  // Worst case scenario (idk someone tampers with something)
  else return <BadRequest />

}

export default Protect