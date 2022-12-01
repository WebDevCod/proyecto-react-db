import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class Login extends Component {

  state = {
    usuario: '',
    clave: '',
    token: '',
    isLoaded: false,
    items: '',
    redirect: false
  }

  usuarioRef = React.createRef();
  claveRef = React.createRef();

  obtenerDatos = (e) => {
    e.preventDefault();
    const usuarioRef = this.usuarioRef.current.value;
    const claveRef = this.claveRef.current.value;
    console.log(usuarioRef);
    console.log(claveRef);


    let url = 'https://localhost:44338/api/Login/authenticate';

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET', "Access-Control-Allow-Headers": "*" },
      body: JSON.stringify({ name: usuarioRef, password: claveRef }),
      crossOriginIsolated: true
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json.status);
        if (json.status === "401") {
          this.setState({
            usuario: usuarioRef,
            clave: claveRef,
            token: '',
            isLoaded: false,
            redirect: false,
            items: ''
          });
          alert("Credenciales no válidas");
          this.props.mensaje('');
          console.log(json.status);
          console.log("No autorizado");
        } else {
          this.setState({
            usuario: usuarioRef,
            clave: claveRef,
            token: json.token,
            isLoaded: true,
            redirect: true,
            items: ''
          })
          window.location.href = "/";
          console.log(json.validTo);
          console.log(json.validFrom);
          this.props.mensaje(json.token, json.validTo, json.validFrom);
          this.forceUpdate();
        };
      });
  }

  controlLogin = (e) => {
    if (localStorage.getItem('token') != null && localStorage.getItem('token') !== '') {
      this.setState({
        usuario: '',
        clave: '',
        token: '',
        isLoaded: false,
        redirect: false,
        items: ''
      })
      localStorage.setItem('token', '');
      console.log('vacio variables')
      this.forceUpdate();
    };
  }

  render() {
    if (localStorage.getItem('token') != null && localStorage.getItem('token') !== '') {
      console.log('tenemos login');
      return (<Navigate push to="/logout" />);
    } else {
      return (
        <form onSubmit={this.obtenerDatos}>
          {this.state.token}
          <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
              <main>
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-lg-5">
                      <div class="card shadow-lg border-0 rounded-lg mt-5">
                        <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                        <div class="card-body">
                          <div class="form-floating mb-3">

                            <input itemID="user" class="form-control" id="inputEmail" ref={this.usuarioRef} type="email" placeholder="name@example.com" />
                            <label for="user">Email address</label>
                          </div>
                          <div class="form-floating mb-3">
                            <input class="form-control" ref={this.claveRef} id="pass" type="password" placeholder="Ingrese su contraseña" />
                            <label for="pass">Password</label>
                          </div>
                          <div class="form-check mb-3">
                            <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                            <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
                          </div>
                          <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a class="small" href="password.html">Forgot Password?</a>
                            <button class="btn btn-primary" name="submit" type="submit">Login</button>
                          </div>

                        </div>
                        <div class="card-footer text-center py-3">
                          <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <div id="layoutAuthentication_footer">
              <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                  <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">Copyright &copy; Your Website 2022</div>
                    <div>
                      <a href="#">Privacy Policy</a>
                      &middot;
                      <a href="#">Terms &amp; Conditions</a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
          <script src="js/scripts.js"></script>
        </form>
      )
    }
  }
}
export default Login;