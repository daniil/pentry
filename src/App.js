import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import LoginPage from './pages/LoginPage';
import MyPentryPage from './pages/MyPentryPage';
import firebaseStore from './utils/firebaseStore';
import Header from './components/Header';
import Footer from './components/Footer';
import theme from './theme';
import './reset.css';
import './fonts.css';

class App extends Component {
  constructor() {
    super();
    firebaseStore.init();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL + '/'}>
          <GlobalStyle />
          <Header />
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/my" component={MyPentryPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
