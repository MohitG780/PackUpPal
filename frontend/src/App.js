
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Homepage} from './components/Homepage.tsx';
import { Destinations } from './components/Destinations.tsx';
import Experiences from './components/Experiences.tsx';

import Dashboard from './components/Dashboard.tsx';
import TravelPlanner from './components/TravelPlanner.tsx';
import Loading from './components/Loading.tsx';
import { CollaboratePage } from './components/Collaborator.tsx';
import SettingsPage from './components/SettingPage.tsx';


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
        <Route
          path="/Dashboard"
          element={
              <Dashboard/>
          }
        />
         <Route
          path="/TravelPlanner"
          element={
              <TravelPlanner/>
          }
        />
         <Route
          path="/Loading"
          element={
              <Loading/>
          }
        />
           <Route
          path="/Collaborator"
          element={
              <CollaboratePage/>
          }
        />
          <Route
          path="/settings"
          element={
              <SettingsPage/>
          }
        />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
