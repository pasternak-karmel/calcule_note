"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./action";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Fond gris clair ici */}
      <form
        action={loginAction}
        className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-sm w-full gap-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>

        <div className="w-full">
          <input
            id="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`w-full py-2 mt-4 text-white font-bold rounded-lg transition duration-300 ${
        pending
          ? "bg-blue-300 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
