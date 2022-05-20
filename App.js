import React from "react";
import { LogBox, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import Toast from "react-native-toast-message"

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Navigators
import { AuthProvider } from "./src/context/auth";
import MainNavigator from "./src/navigation/MainNavigator";

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['Require cycle:']);
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const httpLink = createHttpLink({
  uri: "http://192.168.0.108:4000"
});

const authLink = setContext(async () => {
  const token = await AsyncStorage.getItem("jwtToken");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    client.resetStore();
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      )
    );
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache();

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const client = new ApolloClient({
  cache,
  link,
  defaultHttpLink: false
});

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Provider store={store}>
            <NavigationContainer>
              <MainNavigator />
              <StatusBar 
              backgroundColor="#fff"
              barStyle="dark-content"
              />
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </NavigationContainer>
          </Provider>
        </SafeAreaProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
