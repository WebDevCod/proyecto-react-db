import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class Logout extends Component{

  state = {
    usuario : '',
    clave : '',
    token : '',
    isLoaded: false,
    items: '',
    redirect: false  
  }

    usuarioRef = React.createRef();
    claveRef = React.createRef();

    obtenerDatos = (e) =>{         
        localStorage.setItem('token',"");
        e.preventDefault(); 
        this.forceUpdate();                    
    } 

    controlLogin = (e) =>{
      if(localStorage.getItem('token') != null && localStorage.getItem('token') != '') 
      {
        this.setState({
          usuario: '',
          clave: '',
          token: '',
          isLoaded:false,
          redirect: false,
          items: ''         
        }) 
        localStorage.setItem('token','');
          console.log('vacio variables')
          this.forceUpdate();
      };
    }   

    render() {
      if(localStorage.getItem('token') != null && localStorage.getItem('token') != '') 
      {
        return(            
          <form onSubmit={this.obtenerDatos}>
            { this.state.token}                                     
            <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Logout</h3></div>                                
                                    <div class="card-body">                                       
                                      <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                        
                                          <button class="btn btn-primary" name="submit" type="submit">Logout</button>
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
      }else
      {
        return(<Navigate push to="/login"/>); 
      }       
    }
}
export default Logout