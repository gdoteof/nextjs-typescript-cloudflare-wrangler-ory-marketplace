'use client'
import Link from 'next/link';
import { useClientUserSession} from './_hooks/useClientUserSession';



const Home = () => {
  const { session, loginUrl, logoutUrl, settingsUrl, userName } = useClientUserSession();


  return (
    <div>
      <h1>Thriv</h1>
      <div>
        { session?.identity && (
          <>
            <p>Hello, {session.identity.id}</p>
            <p>
              <Link href="static">
                Profile
              </Link>
            </p>
            <p>
              <Link href="static">Log out</Link>
            </p>
          </>
        ) || (
          <>
            <p>
              <Link href="static">
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
