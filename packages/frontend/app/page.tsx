'use client'

import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'


import { Configuration, FrontendApi, Session, Identity } from "@ory/client"
import { edgeConfig } from "@ory/integrations/next"

const ory = new FrontendApi(new Configuration(edgeConfig))

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity: Identity) =>
  identity.traits.email || identity.traits.username

const Home = () => {
  const router = useRouter()
  const [session, setSession] = useState<Session | undefined>()
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>()

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data)
        // Create a logout url
        ory.createBrowserLogoutFlow().then(({ data }) => {
          setLogoutUrl(data.logout_url)
        })
      })
      .catch(() => {
        // Redirect to login page
        return router.push(edgeConfig.basePath + "/ui/login")
      })
  }, [router])

  if (!session) {
    // Still loading
    return null
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Hello World! This is the Home page</p>
      <p>
        Visit the <Link href="/about">About</Link> page.
      </p>
      <p>Hello, {getUserName(session?.identity)}</p>
          <div>
            <p>
              <a href={logoutUrl}>Log out</a>
            </p>
          </div>
    </div>
  )
}

export default Home
