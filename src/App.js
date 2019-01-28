import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ArticlesPage from "./articles/articles-page.jsx";
import MessagesContainer from "./app-view-components/app-messages.jsx"
import NotificationsContainer from "./app-view-components/app-notifications.jsx";


class App extends Component {
  render() {
    return (
      <div>
        <ArticlesPage />
        <MessagesContainer />
        <NotificationsContainer />

      </div>
    );
  }
}

export default App;
