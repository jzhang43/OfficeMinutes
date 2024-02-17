import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    console.log(session);
    return (
      <div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn("google")}> SigninButton </button>;
};
