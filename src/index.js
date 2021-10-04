import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

const uri = "https://social-media-3444.herokuapp.com/"; //https://ccz8w.sse.codesandbox.io/
const cache = new InMemoryCache();

const client = new ApolloClient({ uri, cache });

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</StrictMode>,
	rootElement
);
