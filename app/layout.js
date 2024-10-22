'use client';
import Navigation from './components/Navigation';
import '../styles/globals.css'; // Adjust the path if necessary
import SearchBar from '@/Components/SearchBar';
import UserDetails from '@/Components/UserDetails';
import { useEffect, useState } from 'react';
import LogInPage from './Log-SignUp/LogInPage/page';
import SingUpPage from './Log-SignUp/SignUpPage/page';
import { GetLogedUserData, handleAdminData } from '@/API/API CALLS';
import Sppiner from '@/Components/Spiner';
import ChangePassword from './components/changePassword';
import DeActiveUser from './components/deActiveUser';
import Page from './adminPage/page';
import ChangeProfilePicture from './components/profilePicture';

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  //this is used somewhere else track it
  const [changeProfilePic, setChangeProfilePic] = useState(false);
  const [changePasswordPopUp, setChnagePasswordPopUp] = useState(false);
  const [deActivateuser, setDeActivateUser] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [reloadApproveData, setReloadApproveData] = useState(false);
  const [UserDetail, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  // const router = useRouter();

  useEffect(() => {
    async function getUserdata() {
      setLoading(true);
      try {
        if (isAuthenticated) {
          const data = await GetLogedUserData();
          setUserDetails(data.message.getUser);
          if ((isAdmin && !reloadApproveData) || reloadApproveData) {
            const aData = await handleAdminData();
            setAdminData(aData.message.attentionAccount);
          }
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        throw new Error(err.message);
      }
    }
    getUserdata();
  }, [isAuthenticated, reloadApproveData]);

  return (
    <html lang="en">
      <body className="h-screen w-screen">
        {isAuthenticated ? (
          <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr] h-full w-full">
            <header className="bg-gradient-to-r from-amber-500 via-amber-200 to-amber-500 col-span-3 p-5 border-b-4 border-amber-500">
              <div className="flex justify-center items-center">
                <strong>MEMORIES</strong>
              </div>
              {/*   {!isAdmin && (
                <SearchBar placeholder="Search for Photos and Videos" />
              )}*/}
              <div className="flex justify-end">
                <UserDetails
                  UserDetail={UserDetail}
                  setIsAuthenticated={setIsAuthenticated}
                  changePasswordPopUp={changePasswordPopUp}
                  setChnagePasswordPopUp={setChnagePasswordPopUp}
                  setDeActivateUser={setDeActivateUser}
                  setChangeProfilePic={setChangeProfilePic}
                />
              </div>
            </header>
            <aside className="bg-gradient-to-t from-amber-100 via-amber-500 to-amber-100 col-start-1 col-span-1 w-40 border-r-4 border-amber-500">
              <strong>{!isAdmin && <Navigation />} </strong>
            </aside>
            <div className="rounded-[10px] bg-green-50 flex justify-center">
              {!loading ? (
                <main className="w-full h-full bg-gradient-to-t from-amber-100 via-amber-50 to-amber-100">
                  {!isAdmin ? (
                    children
                  ) : (
                    <Page
                      adminData={adminData}
                      setReloadApproveData={setReloadApproveData}
                    />
                  )}
                </main>
              ) : (
                <Sppiner />
              )}
              {changePasswordPopUp && (
                <ChangePassword
                  setChnagePasswordPopUp={setChnagePasswordPopUp}
                />
              )}
              {deActivateuser && (
                <DeActiveUser
                  setDeActivateUser={setDeActivateUser}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}

              {changeProfilePic && (
                <ChangeProfilePicture
                  setChangeProfilePic={setChangeProfilePic}
                />
              )}
            </div>

            <footer className="bg-gradient-to-r from-amber-100 via-amber-500 to-amber-100 col-span-3 p-1 rounded flex justify-center border-t-4 border-amber-500">
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
                setIsAdmin={setIsAdmin}
              />
            )}
          </div>
        )}
      </body>
    </html>
  );
}
