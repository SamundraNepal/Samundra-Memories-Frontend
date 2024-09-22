import { useState } from "react";

export default function UserDetails({ UserDetail }) {
  const [userSettings, setUserSettings] = useState(false);
  const { firstName, lastName, email } = UserDetail;

  function openUserSettings() {
    setUserSettings((prevState) => !prevState);
  }

  return (
    <div className="relative">
      <div className="flex gap-1 justify-center items-center">
        <button onClick={openUserSettings}>
          <img
            className="rounded-full"
            src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg"
            width={45}
            height={40}
            alt="user image"
          />
        </button>
        <h3>{firstName}</h3>
      </div>

      {userSettings && (
        <div className="absolute right-0 p-3 scale-100 duration-300">
          <div className="bg-slate-300 h-[400px] w-80 rounded-[20px]">
            <div className="flex flex-col justify-center items-center">
              <h3 className="mt-1">{email}</h3>
              <img
                className="rounded-full mt-8"
                src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg"
                width={45}
                height={40}
                alt="user image"
              />
              <h3>{firstName + " " + lastName}</h3>
            </div>

            <ul className="absolute mt-1 left-8 flex flex-col gap-3 items-center text-center h-64 w-72 justify-center bg-slate-200 text-xl rounded-[15px]">
              <h3 className="mt-4">Settings</h3>
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
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
