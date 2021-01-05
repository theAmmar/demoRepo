import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'


const httpLink = new HttpLink({ 
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin'
})

const client = new ApolloClient({
  link: httpLink,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div>
          <App />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
