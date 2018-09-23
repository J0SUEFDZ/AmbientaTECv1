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
			hashtag:''
		};
		this.agregarCampana = this.agregarCampana.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	agregarCampana(e){
		var re = / /gi;
		this.state.hashtag = "#AmbientaTEC_" + String(this.state.nombre).replace(re,"");		
		fetch('/api/solicitudes',{
			method: 'POST',
			body: JSON.stringify(this.state),
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }
		})
		.then(res => res.json())
		.then (data => {
			M.toast({html: 'Campaña guardada'});
			this.setState({
				nombre: '',
				direccion: '',
				organizador: '',
				fecha: '',
				telefono:'',
				email:'',
				descripcion: '',
				hashtag: "",				
				disabled: false
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


  render() {
    return (
      <form onSubmit={this.agregarCampana}>
      
        <FormGroup role="form">
        	<ControlLabel>Nombre de campaña</ControlLabel>
          	<FormControl
            	type="text"
            	placeholder="Digite el nombre"
            	className="form-control"
            	onChange = {(event) => this.setState({nombre: event.target.value })}/>
            <ControlLabel>Direccion</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="Digite la direccion"
            	onChange = {(event) => this.setState({direccion: event.target.value })}/>
            <ControlLabel>Organizador</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="Nombre del organizador"
            	onChange = {(event) => this.setState({organizador: event.target.value })}/>
            <ControlLabel>Fecha</ControlLabel>
            <FormControl
            	type="date"
            	placeholder=""
            	onChange = {(event) => this.setState({fecha: event.target.value })}/>
            <ControlLabel>Telefono</ControlLabel>
            <FormControl
            	type="number"
            	placeholder="Celular"
            	onChange = {(event) => this.setState({telefono: event.target.value })}/>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="will100@gmail.com"
            	onChange = {(event) => this.setState({email: event.target.value })}/>
            <ControlLabel>Descripcion</ControlLabel>
            <FormControl
            	type="text"
            	placeholder="Detalles"
            	onChange = {(event) => this.setState({descripcion: event.target.value })}/>
          	<FormControl.Feedback />
        </FormGroup>
		<button type="submit" className="btn light-blue darken-4">
			Enviar
		</button>
      </form>
    );
  }

}

export default CampForm;