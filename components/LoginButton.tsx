import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <div className="mr-2 flex flex-col items-end font-semibold text-gray-800">
          <div className="flex">
            <p className="text-lg pt-1 mr-3">Welcome, {session.user.name}</p>
            <img src={session.user.image} className="w-[40px] rounded-full" />
          </div>
          <p
            className="font-base hover:cursor-pointer text-xs underline text-gray-500"
            onClick={() => signOut()}
          >
            Logout
          </p>
        </div>
      ) : (
        <div
          className="font-semibold rounded-md text-sm bg-gray-200  text-gray-800 px-4 py-2 mr-8 flex gap-4 hover: cursor-pointer"
          onClick={() => signIn()}
        >
          <img src="google-icon.png" width="20px" />
          <p>Login with Google</p>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
