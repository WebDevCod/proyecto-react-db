import React from 'react';
import { Component } from 'react';
import { Navigate } from "react-router-dom";

class Products extends Component {
/*   state = {
    token: '',
    redirect: ''
  } */
  render() {
    /* if (localStorage.getItem('token') == null || localStorage.getItem('token') === '') {
      console.log('sin login');
      return (<Navigate push to="/login" />);
    } else { */
      return (
        <>
        <div className='products'>
          <div><h3>{localStorage.getItem('token')}</h3></div>
          <br/>
          <div><h1>Productos</h1></div>
        </div>      
        </>
      )
    }
  };


export default Products;
