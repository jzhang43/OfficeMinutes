import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export const SignInButton = () => {
  const { data: session } = useSession();

  console.log(session);

  if (session && session.user) {
    return (
      <div>
        <button onClick={() => signOut()}>Sign Out</button>;
      </div>
    );
  }

  return <button onClick={() => signIn("google")}> SigninButton </button>;
};
