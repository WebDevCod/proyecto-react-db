import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import EstadosLista from './pages/EstadosLista';
import Login from './pages/Login';
import { Component } from 'react';
import EstadosAlta from './pages/EstadosAlta';
import Logout from './pages/Logout';
import Solicitud from './pages/Solicitud';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      tokenValidTo: '',
      tokenValidFrom: ''
    }
  }

  myToken = (token, validTo, validFrom) => {

    this.setState({
      token: token,
      tokenValidTo: validTo,
      tokenValidFrom: validFrom
    }, () => {
      console.log(token);
      localStorage.setItem('token', token);
      localStorage.setItem('tokenValidTo', validTo);
      localStorage.setItem('tokenValidFrom', validFrom);
      console.log(localStorage.getItem('token') + ' de sessiion')
    })
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/estados/editar/' element={<EstadosAlta />} />
          <Route path='/estados' element={< EstadosLista />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login mensaje={this.myToken} />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/products' element={<Products />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/solicitud' element={<Solicitud />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

