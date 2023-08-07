import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/Login.module.css";

const LoginButton: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <div className={styles.login_container}>
          <div className="flex">
            <p className={styles.user_name}>Welcome, {session.user.name}</p>
            <img src={session.user.image} className={styles.user_image} />
          </div>
          <p className={styles.signout_button} onClick={() => signOut()}>
            Logout
          </p>
        </div>
      ) : (
        <div
          className="font-semibold rounded-md text-sm bg-gray-200  text-gray-800 px-4 py-2 flex gap-4 hover: cursor-pointer"
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
