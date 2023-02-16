import { useEffect, useState } from "react"

import { useSelector } from "react-redux"

import BadRequest from "./BadRequest"

import Unauthorized from "./Unauthorized"

import WelcomePage from "./WelcomePage"


const Protect = ({ page: Page }: { page: () => JSX.Element }) => {

  // tested: has the data been fetched || available: is the user data available in the store
  const { tested, available } = useSelector((store: any) => store.conversation)

  // Mainly for transitioning purposes
  const [status, setStatus] = useState("not-tested")

  useEffect(() => {

    if (status === "not-tested" && tested) {

      setStatus("transition")

      setTimeout(() => { setStatus("tested") }, 400);

    }

  }, [status, tested])

  // Different cases and their responses

  // Hasn't been tested (still fetching) and not available | or its transitioning |, render welcome (when the user lands)
  if ((!tested && !available) || status !== "tested") return <WelcomePage hide={status === "transition"} />

  // Hasn't been tested (still fetching) and available, render welcome (this is impossible but still)
  else if ((!tested && available)) return <WelcomePage hide={false} />

  // Has been tested (done fetching) but not available, render unauthorized (user isn't logged in)
  else if (tested && !available && status === "tested") return <Unauthorized />

  // Has been tested (done fetching) and available, render what is passed in (user is logged in and data has been fetched)
  else if (tested && available && status === "tested") return <Page />

  // Worst case scenario (idk someone dumb tampers with something)
  else return <BadRequest />

}

export default Protect