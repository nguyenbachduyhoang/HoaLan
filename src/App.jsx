
  /* The following line can be included in your src/index.js or App.js file */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import Product from './Component/Product/Product';
import Special from './Component/Special/Special';
import Detail from './Component/Detail/Detail';
import About from './Component/About/About'
import Contact from './Component/Contact/Contact';
import Contact1 from './Component/Contact1/Contact1';
import DashBoard from './Component/HomeNews/DashBoard';
import Login from './Component/Login/Login';



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/tintuc" element={<DashBoard />} /> {/*  */}
          <Route path="/products" element={<Product />} />
          <Route path="/special-products" element={<Special />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} /> {/*  */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact1" element={<Contact1 />} />
          <Route path="/login" element={<Login />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
