import React from 'react';
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter";
import NavbarComponent from "./components/NavbarComponent";
import {Container} from "react-bootstrap";

const App = () => {
  return (
    <BrowserRouter>
        <Container className="min-vh-100">
            <NavbarComponent />
            <AppRouter />
        </Container>
    </BrowserRouter>
  );
}

export default App;
