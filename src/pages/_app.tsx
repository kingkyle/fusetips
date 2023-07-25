import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session} >
      <Component {...pageProps} />
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        closeOnClick
        position="top-right"
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
