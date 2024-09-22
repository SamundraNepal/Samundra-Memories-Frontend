import Sppiner from "@/Components/Spiner";
import Link from "next/link";
import { useState } from "react";

export default function Page({ setSignUp, setIsAuthenticated }) {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
    OTP: "",
  });
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("http://127.1.0.1:8000/v1/memories/logIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logInData),
        credentials: "include", // Important to include cookies in the request
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setLoading(false);
        setMessage(errorMessage.message);
        throw new Error(errorMessage.message || "Something went wrong");
      }

      const data = await response.json();
      setResult(true);
      setLoading(false);
      if (logInData.OTP === "") {
        setMessage(data.message);
      } else {
        setMessage(data.message.message);
      }

      console.log(data);
      if (data.message.message === "Logged in") {
        console.log(data.message.token);
        sessionStorage.setItem("cookies", data.message.token);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setResult(false);
      setLoading(false);
      setMessage(err.message);
    }
  }

  return (
    <>
      {!loading ? (
        <div className="flex flex-col justify-center items-center bg-cyan-50 h-full w-full">
          <div className="bg-slate-500 p-20 rounded-[10px] flex justify-center  text-slate-50 bg-opacity-50">
            <div className="text-center">
              <h1 className="mt-10 text-xl">
                <strong>LOG IN </strong>
              </h1>

              <form
                className="mt-16 flex flex-col text-start gap-3 w-72"
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
                  className="p-2 rounded text-black "
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
                  className="p-2 rounded text-black"
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
                      ? "text-green-600 text-xl uppercase"
                      : "text-red-600 uppercase"
                  }`}
                >
                  {message}
                </label>
                <div className="flex justify-center items-center gap-3 p-10 text-black">
                  <button className="bg-slate-300 w-20 rounded">Log In</button>
                  <Link href="/Log-SignUp/SignUpPage/">
                    <button
                      className="bg-slate-300 w-20 rounded"
                      onClick={signUp}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Sppiner />
      )}
    </>
  );
}
