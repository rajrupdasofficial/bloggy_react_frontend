import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';

const App: React.FC = () => (
<>
<Routes>
<Route path="/" element={ <Home /> }/>

</Routes>
</>

);
export default App;
