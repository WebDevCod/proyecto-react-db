import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import SessionControl from '../components/SessionControl';

class EstadosLista extends Component
{

    State=
    {
        estados : []
    }

    constructor(props)
    {
        super(props);
        this.state = { estados : []}

    }

    componentDidMount(){

        
        console.log(localStorage.getItem('token'))
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Methods': 'POST, GET', "Access-Control-Allow-Headers": "*",
                        'Authorization': 'Bearer ' + localStorage.getItem('token')}                        
          }; 

        fetch("https://localhost:44338/api/Estados", requestOptions).then((resp)=>{
            return resp.json();
        }).then((data)=>{
                console.log(data);
                this.setState({estados : data});
            });


    }



    handleDelete(codigo)
    {
        console.log(codigo);



        let url = 'https://localhost:44338/api/Estados/delete';
       
        console.log("evento evento");
        fetch(url
                ,{method: "post",
                    headers:{
                        "Content-Type" : "application/json",
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({codigo: codigo})
                }
                ).then((resp) => {
                    window.location = "/estados/"
                    
                    }
            )
        
    }

    render()
    {
        return(
            
            <div>                
                <SessionControl/>
                <a href="/estados/alta" className="btn btn-primary btn-lg btn-block">Agregar</a>    
                <table className="table table-over">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
      
                        <React.Fragment>   
                        {
                            
                            this.state.estados.map((estado, i)=>{   
                                return(
                                    <tr key={estado.codigo}>    
                                        <td>{estado.codigo}</td>
                                        <td>{estado.estado}</td>
                                       
                                        <td className="text-right">
                                            <Link  to={{
                                            pathname: "/estados/editar/",
                                            state: { fromDashboard: true },
                                            aboutProps:{codigo: estado.codigo, estado: estado.estado}
                                            }} className="btn btn-primary">
                                                Editar
                                            </Link>
                                        

                                            <button type="button" className="btn btn-danger ml-1"
                                                onClick={this.handleDelete.bind(this,estado.codigo)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                            
                                )
                            }
                        
                            )
                        }   
                        </React.Fragment> 
                    </tbody>
                </table>
            </div>
          
        
            )
    }     

}

export default EstadosLista; 