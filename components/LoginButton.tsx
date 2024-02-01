import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/Login.module.css";

const LoginButton: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center">
      <p className="text-xs">*API key temporarily expired</p>
      {session ? (
        <div className={styles.login_container}>
          <div className={styles.login_main_content}>
            <p className={styles.user_name}>Welcome, {session.user.name}</p>
            <img src={session.user.image} className={styles.user_image} />
          </div>
          <p className={styles.signout_button} onClick={() => signOut()}>
            Logout
          </p>
        </div>
      ) : (
        <div className={styles.signin_button} onClick={() => signIn()}>
          <img src="google-icon.png" width="20px" />
          <p>Login with Google</p>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
