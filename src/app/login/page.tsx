"use client";

import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <button type="button" onClick={() => void signIn("google")}>
      <span>Login with Google</span>
    </button>
  );
}
