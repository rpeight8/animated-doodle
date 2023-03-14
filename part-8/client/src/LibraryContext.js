import { ProviderComposer, provider } from "./providers/ProviderComposer";
import { ApolloProvider } from "@apollo/client";
import Client from "./ApolloClient";
import { BrowserRouter } from "react-router-dom";
import { NotificationContextProvider } from "./providers/NotificationProvider";
import { AuthContextProvider } from "./providers/AuthProvider";

export const LibraryContext = ({ children }) => {
  return (
    <ProviderComposer
      providers={[
        provider(AuthContextProvider),
        provider(ApolloProvider, { client: Client }),
        provider(BrowserRouter),
        provider(NotificationContextProvider),
      ]}
    >
      {children}
    </ProviderComposer>
  );
};
