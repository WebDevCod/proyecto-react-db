import React, { Component } from "react";
import { useParams as param} from "react-router-dom";


class EstadosAlta extends Component
{

    constructor(props)
    {


        super(props);


        if(props.location?.aboutProps.codigo != null)
        {
            this.state={
                codigo: props.location?.aboutProps.codigo,
                estado: props.location?.aboutProps.estado,
                modo: "edit"
            }
        }else
        {
            this.state={
                codigo: "",
                estado: "",
                modo: "new"
            }  
        }
        

       
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    handleSubmit(event){
        let url = 'https://localhost:44338/api/Estados/add';
        if(this.state.modo == 'edit')
            url = 'https://localhost:44338/api/Estados/update';

        event.preventDefault();
        console.log("evento evento");
        fetch(url
            ,{method: "post",
                headers:{
                    "Content-Type" : "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(this.state)
            }
            ).then((resp) => {
                window.location = "/estados/"
            }
            )
    }

    render()
    {
        return(
            
                <form onSubmit={this.handleSubmit.bind(this)}>
                    Codigo: <input type="text" value={this.state.codigo} name="codigo" className="form-control"
                             onChange={this.handleChange.bind(this)} />
                    Estado: <input type="text" value={this.state.estado} name="estado" className="form-control"
                             onChange={this.handleChange.bind(this)} />
                    <button className="btn btn-primary btn-block">Enviar</button>
                    <a href="/estados" className="btn btn-danger btn-block">Cancelar</a>
                </form>
        
            )
    }     

}

export default EstadosAlta;