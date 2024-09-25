import U_Button from '@/Components/Button';
import Sppiner from '@/Components/Spiner';
import Link from 'next/link';
import { useState } from 'react';

export default function Page({ setSignUp, setIsAuthenticated }) {
  const [logInData, setLogInData] = useState({
    email: '',
    password: '',
    OTP: '',
  });
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  function signUp() {
    setSignUp(true);
  }

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setLogInData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function LogIn(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.1.0.1:8000/v1/memories/logIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logInData),
        credentials: 'include', // Important to include cookies in the request
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setLoading(false);
        setMessage(errorMessage.message);
        setLogInData({ OTP: '' });
        throw new Error(errorMessage.message || 'Something went wrong');
      }

      const data = await response.json();
      setResult(true);
      setLoading(false);
      if (logInData.OTP === '') {
        setMessage(data.message);
      } else {
        setMessage(data.message.message);
      }

      if (data.message.message === 'Logged in') {
        sessionStorage.setItem('cookies', data.message.token);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setResult(false);
      setLoading(false);
      setMessage(err.message);
    }
  }

  function handleForgotPassword() {
    setMessage('');
    setForgotPassword((pre) => !pre);
  }

  return (
    <>
      {!loading ? (
        <div className="flex flex-col justify-center items-center bg-green-100 h-full w-full">
          {!forgotPassword ? (
            <div className="bg-green-500 h-3/5 w-2/5 rounded-[10px] flex justify-start  text-slate-50 bg-opacity-50">
              <div className="text-center p-6 w-full">
                <h1 className=" text-2xl font-serif">
                  <strong>LOG IN </strong>
                </h1>

                <form
                  className="mt-16 flex flex-col text-start gap-3 w-full text-l"
                  onSubmit={LogIn}
                >
                  <p>
                    <strong>Email Address</strong>
                  </p>
                  <input
                    placeholder="Enter your Email Address"
                    name="email"
                    value={logInData.email}
                    onChange={HandleChange}
                    className="p-2 rounded text-black bg-slate-200 "
                  />
                  <p>
                    <strong>Password</strong>
                  </p>

                  <input
                    placeholder="Enter your Password"
                    name="password"
                    value={logInData.password}
                    onChange={HandleChange}
                    type="password"
                    className="p-2 rounded text-black bg-slate-200 "
                  />

                  <div>
                    {result && (
                      <p>
                        <strong>Verification Code</strong>
                      </p>
                    )}
                    {result && (
                      <input
                        placeholder="verification code"
                        name="OTP"
                        value={logInData.OTP}
                        onChange={HandleChange}
                        type="text"
                        className="p-2 rounded text-black"
                      />
                    )}
                  </div>

                  <label
                    className={`${
                      result
                        ? 'text-green-600 text-xl uppercase'
                        : 'text-red-600 uppercase'
                    }`}
                  >
                    {message}
                  </label>
                  <div className="flex gap-4">
                    <U_Button b_name="Log In" />

                    <Link href="/Log-SignUp/SignUpPage/">
                      <U_Button b_name="Sign Up" b_function={signUp} />
                    </Link>

                    <U_Button
                      b_name="Forgot Password"
                      b_function={handleForgotPassword}
                    />
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <HandleForgotPassword
              setMessage={setMessage}
              message={message}
              setLoading={setLoading}
              loading={loading}
            />
          )}
        </div>
      ) : (
        <Sppiner />
      )}
    </>
  );
}

function HandleForgotPassword({ setMessage, message, setLoading, loading }) {
  const [foundAccout, setFoundAccount] = useState(true);
  const [Email, setEmail] = useState({ email: '' });

  async function findAccount() {
    try {
      setLoading(true);
      const response = await fetch(
        'http://127.1.0.1:8000/v1/memories/user/forgotPassword',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Email),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        setMessage(error.status);
        setLoading(false);
      } else {
        const data = await response.json();
        setMessage(data.status);
        console.log(data);
        setLoading(false);
        setFoundAccount(true);
      }
    } catch (err) {
      setLoading(false);
      setFoundAccount(false);

      setMessage('Something went wrong. Please try again.');
    }
  }
  return (
    <>
      <div className="bg-cyan-100 rounded-[10px] border-[10px] border-cyan-200 flex flex-col h-4/6 w-5/6 justify-center items-center gap-10">
        <header className="uppercase font-bold">
          <h1> Forgot Password </h1>
        </header>
        {!foundAccout ? (
          <div className="flex flex-col gap-5 justify-center items-center bg-cyan-200 p-3 rounded-[10px]">
            <h3>Please enter your email address to search for your account.</h3>
            <input
              type="text"
              placeholder="Enter your email"
              className="p-4 rounded-[10px]"
              value={Email.email}
              onChange={(e) => setEmail({ email: e.target.value })}
            />
            <h3 className="text-red-500">{message}</h3>
            <U_Button b_name="Find" b_function={findAccount} />
          </div>
        ) : (
          <AccountFound />
        )}
      </div>
    </>
  );
}

function AccountFound() {
  return <div className="bg-cyan-50 h-4/5 w-3/5"></div>;
}
