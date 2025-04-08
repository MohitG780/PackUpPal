
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Homepage} from './components/Homepage.tsx';
import { Destinations } from './components/Destinations.tsx';
import Experiences from './components/Experiences.tsx';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route
          path="/"
          element={
              <Homepage/>
          }
        />
        <Route
          path="/Destination"
          element={
              <Destinations/>
          }
        />
        <Route
          path="/Experiences"
          element={
              <Experiences/>
          }
        />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
