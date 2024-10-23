import U_Button from '@/Components/Button';
import U_input from '@/Components/Input';
import Sppiner from '@/Components/Spiner';
import { useState } from 'react';
import HandleForgotPassword from '../forgotPassword/ForgotPassword';
import { apiLink } from '@/API/API CALLS';

export default function Page({ setSignUp, setIsAuthenticated, setIsAdmin }) {
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
      const response = await fetch(`${apiLink}/logIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logInData),
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
      if (data.message.Role === 'admin') {
        setIsAdmin(true);
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
    setForgotPassword(true);
  }

  return (
    <>
      {!loading ? (
        <div className="flex flex-col justify-center items-center h-full w-full bg-gradient-to-t from-amber-100 via-green-50 to-amber-100 ">
          <title>Memories/LogIn</title>
          {!forgotPassword ? (
            <div className="bg-amber-500 h-3/5 w-2/5 rounded-[10px] flex justify-start  text-slate-50 bg-opacity-50">
              <div className="text-center p-6 w-full">
                <h1 className=" text-2xl font-bold">
                  <strong>LOG IN </strong>
                </h1>

                <form
                  className="mt-16 flex flex-col text-start gap-3 w-full text-l"
                  onSubmit={LogIn}
                >
                  <p>
                    <strong>Email Address</strong>
                  </p>
                  <U_input
                    PlaceHolder="Enter your Email Address"
                    name="email"
                    Value={logInData.email}
                    OnChange={HandleChange}
                    autoFocus
                    Type="email"
                  />

                  <p>
                    <strong>Password</strong>
                  </p>

                  <U_input
                    PlaceHolder="Enter your Password"
                    name="password"
                    Value={logInData.password}
                    OnChange={HandleChange}
                    Type="password"
                    className="p-2 rounded text-black bg-slate-200 "
                  />

                  <div>
                    {result && (
                      <p>
                        <strong>Verification Code</strong>
                      </p>
                    )}
                    {result && (
                      <U_input
                        PlaceHolder="verification code"
                        name="OTP"
                        Value={logInData.OTP}
                        OnChange={HandleChange}
                        type="text"
                      />
                    )}
                  </div>

                  <label
                    className={`${
                      result
                        ? 'text-whute-600 text-xl uppercase'
                        : 'text-red-600 uppercase'
                    }`}
                  >
                    {message}
                  </label>
                  <div className="flex gap-4">
                    <U_Button b_name="Log In" />

                    <U_Button b_name="Sign Up" b_function={signUp} />

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
              setForgotPassword={setForgotPassword}
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
