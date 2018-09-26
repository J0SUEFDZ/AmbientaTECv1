import React, {Component} from 'react';
import { Modal, Panel, PanelGroup, Button } from 'react-bootstrap';

import ChallengeModel from './ChallengeModel';
import ChallengeOnAir from './ChallengeOnAir';

class Challenge extends Component{
	constructor(props, context){
		super(props, context);

		this.state = {
			userId: '',
			challenges:[],
			retosParticipacion: [],
			retosP:[],
			show: false
		};

		this.areDifferentByIds = this.areDifferentByIds.bind(this);
		this.removeChallenge = this.removeChallenge.bind(this);
		this.test = this.test.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	handleShow() {
    	this.setState({ show: true });
	}
	handleClose() {
    	this.setState({ show: false });
  	}
	componentDidMount() {
		const usuario=this.props.usuario;
		this.setState({
			userId: usuario._id,
			challenges: [],
			retosParticipacion: usuario.retosParticipacion
		});
	    this.fetchChallenges();
	    
	}

	areDifferentByIds(a, b) {
		console.log(a);
		console.log(b);
	    var idsA = a.map( (x) => { return x._id; } ).sort();
	    var idsB = b.map( (x) => { return x; } ).sort();
	    return (idsA.join(',') === idsB.join(',') );
	}

	fetchChallenges() {
	    fetch('/api/challenges')
	      .then(res => res.json())
	      .then(data => {
	      	this.setState({challenges: data});				
			});
	        //this.setState({challenges: data});
	        //console.log(this.state.challenges);
	}

	test() {
		const lista = this.state.retosParticipacion;
		lista.forEach(function(entry) {
			fetch(`/api/challenges/${entry}`)	
			.then(res => res.json())
			.then(data => {
				const joined = this.state.retosParticipacion.concat(data);
        		this.setState({retosParticipacion: joined});
        		console.log(data);
      		});	
		});
	}

	removeChallenge(retoP) {
		console.log(this.state.challenges);
		var array = this.state.challenges;
		var index = array.indexOf(retoP);
		console.log(index);
		if(index >= 0){
			console.log("IF if");
			array.splice(index, 1);
			this.setState({challenges: array});
		}
	}

	render() {
		const retosTodos = this.state.challenges.map((reto, i) =>{
			return (
				<div key={reto._id} style={{width: "80%"}} >
					<PanelGroup accordion id="accordion-example">	
						<Panel eventKey= {i} >
					    	<Panel.Heading>
					      		<Panel.Title toggle>{reto.challengeName}</Panel.Title>
					    	</Panel.Heading>
					    	<Panel.Body collapsible>
					    		<p>Puntos al ganar el reto: {reto.points}</p>
				          		<p>Tiempo en segundos: {reto.time}</p>
				          		<p>Descripción: {reto.description}</p>
				          		<p>USUARIO: {this.state.userId}</p>
						      	<p>Fecha en que termina: {reto.endDate}</p>
						      	<ChallengeModel newReto={reto} user={this.state.userId}/>
					    	</Panel.Body>
					  	</Panel>
					</PanelGroup>
				</div>
			)
		});


		return(

	        <div className= "container">
	        	<div className="row">			    		
		            	{retosTodos}
		    	</div>	
		    	<div className="row">
			    	<Button bsStyle="success" bsSize="large" onClick={this.handleShow}>
							Ver Participaciones
					</Button>
				</div>
				<div className= "modal">
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Retos en los que esta participando.</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ChallengeOnAir retosPart={this.state.retosParticipacion}/>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.handleClose}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>

	        </div>	
		)
	}

}


export default Challenge;