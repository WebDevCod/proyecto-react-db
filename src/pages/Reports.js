import React from 'react';
import '../App.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Alert } from 'reactstrap'
import { render } from '@testing-library/react';
import SessionControl from '../components/SessionControl';

const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood" },
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];

class Reports extends React.Component {
  state = {
    data: data,
    form: "",
    estados: [],
    modalActualizar: false,
    modalInsertar: false
  }

/*   constructor(props) {
    super(props);
    this.setState({
      data: data,
      form: "",
      estados: []
    });
  } */

  componentDidMount() {

    console.log(localStorage.getItem('token'))
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET', "Access-Control-Allow-Headers": "*",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };

    fetch("https://localhost:44338/api/Estados", requestOptions)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({ estados: data });
    });
  }

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalEditar = (registro) => {
    this.setState({
      modalEditar: true, form: registro
    });
  };

  cerrarModalEditar = () => {
    this.setState({ modalEditar: false });
  };


  handleChange(event) {
    console.log(event.target.value);
    this.state.form.estado = event.target.value;
  }

  DeleteElement(registro) {
    let url = 'https://localhost:44338/api/Estados/delete';
    console.log(registro.codigo);



    console.log("evento evento");
    fetch(url
      , {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(registro)
      }
    ).then((resp) => {

      const newList = this.state.estados.filter((item) => item.codigo !== registro.codigo);
      this.setState({
        estados: newList
      });
      // this.cerrarModalInsertar();
    }
    )
  }

  InsertNew(cod, estado) {
    let url = 'https://localhost:44338/api/Estados/add';
    console.log(cod);
    console.log(estado);

    const nuevo_estado = {
      codigo: cod,
      estado: estado
    };
    console.log(nuevo_estado);


    //this.preventDefault();
    console.log("evento evento");
    fetch(url
      , {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(nuevo_estado)
      }
    ).then((resp) => {
      this.state.estados.push
        ({
          codigo: nuevo_estado.codigo,
          estado: nuevo_estado.estado
        });

      this.cerrarModalInsertar();
    }
    )
  }

  SaveEdit(event) {
    let url = 'https://localhost:44338/api/Estados/update';

    //this.preventDefault();
    console.log("evento evento");
    fetch(url
      , {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(this.state.form)
      }
    ).then((resp) => {
      // window.location = "/reports/"
      this.cerrarModalEditar();
    }
    )
  }

  render() {
    return (

      <Container>
      <SessionControl/>
        <Button color="primary" onClick={() => this.mostrarModalInsertar()}>Agregar Nuevo</Button>
        <br />
        <br />        
      	<div class="table-responsive">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-1-circle" viewBox="0 0 16 16">
            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"/>
          </svg>
          <table class="table table-striped table-hover table-sm table-info border-info">
            <thead>
              <tr>
              <th scope="col">cod. estado </th>
              <th scope="col">Nombre estado</th>
              <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.estados.map((estado, i) => {
                return (
                  <tr key={estado.codigo}>
                    <td style={{ width: '33%' }} >{estado.codigo}</td>
                    <td style={{ width: '33%' }} >{estado.estado}</td>
                    <td style={{ width: '33%' }} >
                      <button type="button" className="btn btn-primary ml-1" onClick={() => this.mostrarModalEditar(estado)}>
                        Editar
                      </button>
                      <button type="button" className="btn btn-danger ml-1" onClick={() => this.DeleteElement(estado)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>

                )
              }
              )
            }           
            </tbody>

           </table>
        </div>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Nuevo estado</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Codigo:
              </label>

              <input id='cod_estado'
                className="form-control"
                name="codigo"
                type="text"
                defaultValue={""}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado:
              </label>
              <input id='estado_estado'
                className="form-control"
                name="estado"
                type="text"
                defaultValue={""}
              />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.InsertNew(document.getElementById("cod_estado").value, document.getElementById("estado_estado").value)}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editando estado</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Codigo:
              </label>

              <input
                className="form-control"
                name="codigo"
                type="text"
                value={this.state.form.codigo}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado:
              </label>
              <input
                className="form-control"
                name="form"
                type="text"
                onChange={this.handleChange.bind(this)}
                defaultValue={this.state.form.estado}

              />
            </FormGroup>

          </ModalBody>
          <ModalFooter>

            <Button
              color="primary"
              onClick={() => this.SaveEdit()}>
              Guardar
            </Button>

            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalEditar()}>
              Cancelar
            </Button>

          </ModalFooter>
        </Modal>

      </Container>
    )


  }

}

export default Reports;
