import React, {Component} from 'react';
import { Panel, PanelGroup, Button } from 'react-bootstrap';

import ChallengeModel from './ChallengeModel';

class Challenge extends Component{
	constructor(props, context){
		super(props, context);
		this.state = {
			userId: '',
			challengeName: '',
			points: '',
			endDate: '',
			time: 0,
			description: '',
			challenges:[],
			show: false,
			retosParticipacion: []
		};
		this.areDifferentByIds = this.areDifferentByIds.bind(this);
	}
	componentDidMount() {
		const usuario=this.props.usuario;
		this.setState({
			userId: usuario._id,
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
	        //console.log(this.state.challenges);
	      });
	}

	removeChallenge() {
		const retosP = this.state.retosParticipacion.map((retoP, j) =>{
			var array = this.state.challenges; // make a separate copy of the array
	  		var index = array.indexOf(retoP)
	  		array.splice(retoP, 1);
	  		this.setState({challenges: array});
	  	})
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
	        </div>	
		)
	}

}


export default Challenge;