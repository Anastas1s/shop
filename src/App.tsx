import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Basket from "./pages/Basket/Basket";
import Card from "./pages/Card/Card";

function App() {
    return (
        <>
            <Header/>
            <div className="Home-container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/basket" element={<Basket/>}/>
                    <Route path="/card/:id" element={<Card/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App;
