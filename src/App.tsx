import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Authc from './components/authcomponents/Authc';
import ProfilePage  from'./components/userprofile/userProfile';

const App: React.FC = () => (
<>
<Routes>
<Route path="/" element={ <Home /> }/>
<Route path="/authc" element={ <Authc /> } />
<Route path='/userprofile' element={<ProfilePage /> } />
</Routes>
</>

);
export default App;
