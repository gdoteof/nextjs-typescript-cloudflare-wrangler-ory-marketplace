'use client'

import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'


import { Configuration, FrontendApi, Session, Identity } from "@ory/client"


const basePath = process.env.NEXT_PUBLIC_ORY_SDK_URL;

const ory = new FrontendApi(
  new Configuration({
    basePath: basePath,
    baseOptions: {
      withCredentials: true,
    },
  })
);


const Home = () => {
  const router = useRouter()
  const [session, setSession] = useState<Session | undefined>()
  const [logoutUrl, setLogoutUrl] = useState<string>("")
  const [settingsUrl, setSettingsUrl] = useState<string>("")
  const [userName, setUsername] = useState<string | undefined>()

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data)
        setUsername(data.identity.traits.username)
        ory.createBrowserSettingsFlow().then(({ data }) => {
          setSettingsUrl(data.request_url)
        })
        // Create a logout url
        ory.createBrowserLogoutFlow().then(({ data }) => {
          setLogoutUrl(data.logout_url)
        })
      })
      .catch(() => {
        setUsername('anonymous coward')
      })
  }, [router])

  // Returns either the email or the username depending on the user's Identity Schema
  const getUserName = (identity: Identity | undefined) =>
    identity?.traits.email || identity?.traits.username || 'anonymous coward'

  return (
    <div>
      <h1>Thriv</h1>
      <p>Hello, {getUserName(session?.identity)}</p>
          <div>
            { session?.identity && (
              <>
                <p>
                  <Link href={settingsUrl}>
                    Profile
                  </Link>
                </p>
                <p>
                  <Link href={logoutUrl}>Log out</Link>
                </p>
              </>
            )
            || (
              <>
                <p>
                  <Link href={basePath + "/ui/login"}>
                    Log in
                  </Link>
                  </p></>
            )
            }
          </div>
    </div>
  )
}

export default Home
