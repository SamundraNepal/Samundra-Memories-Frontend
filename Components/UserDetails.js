import Image from 'next/image';
import { useState } from 'react';

export default function UserDetails({ UserDetail }) {
  const [userSettings, setUserSettings] = useState(false);
  const { firstName, lastName, email, imageLink } = UserDetail;
  if (imageLink !== undefined) {
    var newImageLink = imageLink.replace('}', '');
  }

  function openUserSettings() {
    setUserSettings((prevState) => !prevState);
  }

  return (
    <div className="relative">
      <div className="flex gap-1 justify-center items-center">
        <button onClick={openUserSettings}>
          <Image
            className="rounded-full object-contain"
            src={newImageLink} // Replace backslashes with forward slashes
            width={50}
            height={50}
            alt="user image"
          />
        </button>
        <h3>{firstName}</h3>
      </div>

      {userSettings && (
        <div className="absolute right-0 p-3 scale-100 duration-300">
          <div className="bg-slate-300 h-[500px] w-80 rounded-[20px]">
            <div className="flex flex-col justify-center items-center">
              <h3 className="mt-1">{email}</h3>
              <div className="">
                <Image
                  className="rounded-full object-cover mt-8"
                  src={newImageLink} // Replace backslashes with forward slashes
                  width={45}
                  height={40}
                  alt="user image"
                />
              </div>

              <h3>{firstName + ' ' + lastName}</h3>
            </div>

            <ul className="absolute mt-5 left-8 flex flex-col gap-3 items-center text-center h-72 w-72 justify-center bg-slate-200 text-xl rounded-[15px]">
              <div className="rounded w-full">
                <h3 className="mt-1 ">Settings</h3>
                <li className="border-b border-gray-300 w-full py-2">
                  <button className="hover:bg-slate-100 w-full h-10">
                    Change Password
                  </button>
                </li>
                <li className="border-b border-gray-300 w-full py-2">
                  <button className="hover:bg-slate-100 w-full h-10">
                    Change Email
                  </button>
                </li>
                <li className="border-b border-gray-300 w-full py-2">
                  <button className="hover:bg-slate-100 w-full h-10">
                    Deactivate Account
                  </button>
                </li>

                <li className="border-b border-gray-300 w-full py-2">
                  <button className="hover:bg-slate-100 w-full h-10">
                    Log Out
                  </button>
                </li>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
