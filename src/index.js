import { ChakraProvider } from "@chakra-ui/react";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import Contact from "./Contact";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
    
        <Router>
        <Routes>
          <Route  path="/" exact 
           element={<App />}>
          </Route>
          <Route path ="/contact/:id"  
            element={<Contact/>}>
          </Route>
        </Routes>
        </Router>


    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
