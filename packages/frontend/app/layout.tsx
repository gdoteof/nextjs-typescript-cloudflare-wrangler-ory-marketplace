'use client'
import { Providers } from "./providers";
import  {useClientUserSession} from "./_hooks/useClientUserSession";
import Header from "./_components/Header";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, loginUrl, logoutUrl, settingsUrl, userName } = useClientUserSession();
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header userName={userName} loginUrl={loginUrl} logoutUrl={logoutUrl} settingsUrl={settingsUrl} session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
