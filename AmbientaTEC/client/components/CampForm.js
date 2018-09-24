import React, {Component} from 'react';
import { HelpBlock, FormControl, ControlLabel, Button, FormGroup} from 'react-bootstrap';


class CampForm extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			nombre: '',
			direccion: '',
			organizador: '',
			fecha: '',
			telefono:'',
			email:'',
			descripcion: '',
			habilitada: false
		};
		this.agregarCampana = this.agregarCampana.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	agregarCampana(e){
		console.log(this.state.direccion);
		fetch('/api/campanas',{
			method: 'POST',
			body: JSON.stringify(this.state),
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }
		})
		.then(res => res.json())
		.then (data => {
			this.setState({
				nombre: '',
				direccion: '',
				organizador: '',
				fecha: '',
				telefono:'',
				email:'',
				descripcion: '',
				habilitada: false
			});
		})
		.catch(err => console.error(err));
		e.preventDefault();
	}


	handleChange(e){
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
	}

	onHandleSubmit(e) {
	    e.preventDefault();
	    
		this.setState({
			nombre: '',
			direccion: '',
			organizador: '',
			fecha: '',
			telefono:'',
			email:'',
			descripcion: '',
			habilitada: false
		});
  }


  render() {
  	const {nombre, direccion, organizador, fecha, telefono, email, descripcion, habilitada} = this.state;
    return (
      <form className= "form-campanas" 
      		onSubmit={this.agregarCampana}>
        <FormGroup role="form">
        	<ControlLabel>Nombre de campaña</ControlLabel>
          	<FormControl
            	type="text"
            	placeholder="Digite el nombre"
            	className="form-control"
            	name="nombre"
            	value={nombre}
            	onChange = {this.handleChange}/>
            <ControlLabel>Direccion</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="Digite la direccion"
            	className="form-control"
            	name="direccion"
            	value={direccion}
            	onChange = {this.handleChange}/>
            <ControlLabel>Organizador</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="Nombre del organizador"
            	className="form-control"
            	name="organizador"
            	value={organizador}
            	onChange = {this.handleChange}/>
            <ControlLabel>Fecha</ControlLabel>
            <FormControl
            	type="date"
            	placeholder=""
            	name="fecha"
            	className="form-control"
            	value={fecha}
            	onChange = {this.handleChange}/>
            <ControlLabel>Telefono</ControlLabel>
            <FormControl
            	type="number"
            	placeholder="Celular"
            	className="form-control"
            	name="telefono"
            	value={telefono}
            	onChange = {this.handleChange}/>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="will100@gmail.com"
            	className="form-control"
            	name="email"
            	value={email}
            	onChange = {this.handleChange}/>
            <ControlLabel>Descripcion</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="Detalles"
            	className="form-control"
            	name="descripcion"
            	value={descripcion}
            	onChange = {this.handleChange}/>
          	<FormControl.Feedback />
        </FormGroup>
		<button  type="submit" className="btn light-blue darken-4">
			Enviar
		</button>
      </form>
    );
  }

}

export default CampForm;