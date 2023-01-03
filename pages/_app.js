import {UserProvider} from '@auth0/nextjs-auth0/client'
import { createClient, Provider } from "urql";
import { StateContextProvider } from "../lib/contex";
import { Toaster } from "react-hot-toast";
import UserLayout from "Components/layouts/UserLayout";
import "../styles/globals.css";


const client = createClient({ url: process.env.NEXT_PUBLIC_GRAPHQL_URL });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContextProvider>
      <Provider value={client}>
        <Toaster />
        <UserLayout>

        <Component {...pageProps} />
        </UserLayout>
        
      </Provider>
    </StateContextProvider>
    </UserProvider>
  );
}
