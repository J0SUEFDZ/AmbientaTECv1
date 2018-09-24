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
			show: false
		};
	}
	componentDidMount() {
		const usuario=this.props.usuario;

		console.log("abajo");
		this.setState({
			userId: usuario.name
		})
		console.log(this.state.userId);
	    this.fetchChallenges();

	}

	fetchChallenges() {
	    fetch('/api/challenges')
	      .then(res => res.json())
	      .then(data => {
	        this.setState({challenges: data});
	        //console.log(this.state.challenges);
	      });
	}

	render() {
		const retos = this.state.challenges.map((reto, i) =>{
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
		            	{retos}
		    	</div>	
	        </div>	
		)
	}

}


export default Challenge;