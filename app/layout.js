'use client';
import Navigation from './components/Navigation';
import '../styles/globals.css'; // Adjust the path if necessary
import SearchBar from '@/Components/SearchBar';
import UserDetails from '@/Components/UserDetails';
import { useEffect, useState } from 'react';
import LogInPage from './Log-SignUp/LogInPage/page';
import SingUpPage from './Log-SignUp/SignUpPage/page';
import { GetLogedUserData } from '@/API/API CALLS';
import Sppiner from '@/Components/Spiner';

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [UserDetail, setUserDetails] = useState({
    firstName: 'Raja',
    lastName: 'mate',
    email: 'useremail@gmail.com',
  });

  // const router = useRouter();

  useEffect(() => {
    async function getUserdata() {
      setLoading(true);
      try {
        if (isAuthenticated) {
          const data = await GetLogedUserData();
          setUserDetails(data.message.getUser);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        throw new Error(err.message);
      }
    }
    getUserdata();
  }, [isAuthenticated]);

  return (
    <html lang="en">
      <body className="h-screen w-screen">
        {isAuthenticated ? (
          <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr] h-screen">
            <header className="bg-slate-200 col-span-3 p-5 rounded flex justify-between">
              <strong>MEMORIES</strong>
              <SearchBar placeholder="Search for Photos and Videos" />
              <UserDetails UserDetail={UserDetail} />
            </header>
            <aside className="bg-slate-200 col-start-1 col-span-1 w-40 rounded">
              <strong>
                <Navigation />
              </strong>
            </aside>
            <div className="rounded-[10px] bg-slate-100 flex justify-center">
              {!loading ? <main>{children}</main> : <Sppiner />}
            </div>

            <div className="bg-slate-200 col-start-3 row-span-3 p-2 rounded"></div>
            <footer className="bg-slate-200 col-span-3 p-1 rounded flex justify-center">
              <strong>MEMORIES COPYRIGHT</strong>
            </footer>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            {signUp ? (
              <SingUpPage setSignUp={setSignUp} />
            ) : (
              <LogInPage
                setIsAuthenticated={setIsAuthenticated}
                setSignUp={setSignUp}
              />
            )}
          </div>
        )}
      </body>
    </html>
  );
}
