import React, { Component } from 'react';

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      email: '',
    };
  }

  // Manejar el envío del formulario
  handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones con los datos del formulario
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="name"
            value={this.state.nombre}
          />
        </div>
        <div>
          <label htmlFor="horas">horas:</label>
          <input
            type="number"
            id="horas"
            name="hours"
            value={this.state.horas}
          />
        </div>
        <div>
          <label htmlFor="descripcion">descripcion:</label>
          <input
            type="text"
            id="descripcion"
            name="description"
            value={this.state.descripcion}
          />
        </div>
        
        <button type="submit">Enviar</button>
        
      </form>
    );
  }
}

export default Formulario;