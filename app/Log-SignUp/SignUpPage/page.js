// ClientComponent.js
"use client";
import Sppiner from "@/Components/Spiner";
import { data } from "autoprefixer";
import Link from "next/link";
import { useState } from "react";

// This makes the component a Client Component

export default function Page({ setSignUp }) {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [message, setMessage] = useState("");
  function back() {
    setSignUp(false);
  }

  const HandleChange = (event) => {
    const { name, value } = event.target;

    setformData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://127.1.0.1:8000/v1/memories/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setMessage(errorMessage.message);
        setLoading(false);
        throw new Error(errorMessage.message || "something went wrong");
      }

      const data = await response.json();
      setResult(true);
      setMessage("Account created successfully " + data.message.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setLoading(false);
      setResult(false);
    }
  }

  return (
    <>
      {!loading ? (
        <div className="flex flex-col justify-center items-center bg-cyan-50 h-full w-full">
          <div className="bg-slate-500 rounded-[10px] flex justify-center p-24 text-slate-50 bg-opacity-50">
            <div className="flex flex-col p-3">
              <h1 className="mt-10 text-xl">
                <strong>Sign Up </strong>
              </h1>

              <form
                className="mt-24 flex flex-col text-start gap-3"
                onSubmit={handleSubmit}
              >
                <p>
                  <strong>First Name</strong>
                </p>
                <input
                  placeholder="Enter your Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={HandleChange}
                  className="p-2 rounded text-black"
                />

                <p>
                  <strong>Last Name</strong>
                </p>
                <input
                  placeholder="Enter your Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={HandleChange}
                  className="p-2 rounded text-black"
                />

                <p>
                  <strong>Email Address</strong>
                </p>
                <input
                  placeholder="Enter your Email Address"
                  name="email"
                  value={formData.email}
                  onChange={HandleChange}
                  className="p-2 rounded text-black"
                />
                <p>
                  <strong>Password</strong>
                </p>

                <input
                  placeholder="Enter your Password"
                  name="password"
                  value={formData.password}
                  onChange={HandleChange}
                  type="password"
                  className="p-2 rounded text-black"
                />

                <p>
                  <strong>Confirm Password</strong>
                </p>

                <input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={HandleChange}
                  className="p-2 rounded text-black"
                />

                <label
                  className={`${!result ? "text-red-500" : "text-green-400"}`}
                >
                  <strong>{message}</strong>
                </label>

                <div className="flex justify-center items-center gap-3 p-10 text-black">
                  <Link href="/">
                    <button
                      className="bg-slate-300 w-20 rounded"
                      onClick={back}
                    >
                      Back
                    </button>
                  </Link>
                  <button className="bg-slate-300 w-40 rounded">
                    Create Account
                  </button>
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
