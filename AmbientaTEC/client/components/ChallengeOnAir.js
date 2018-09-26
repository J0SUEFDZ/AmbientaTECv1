import React, {Component} from 'react';
import { Modal, Panel, PanelGroup, Button } from 'react-bootstrap';



class ChallengeOnAir extends Component{
	constructor(props, context){
		super(props, context);
		this.state = {
			retosParticipacion: []
		};
		
	}

	componentDidMount() {
		const promises = this.props.retosPart.map(el=>
			console
			fetch(`/api/challenges/${el}`)	
			.then(e=>e.json()));
    	Promise.all(promises)
    	.then(retosParticipacion => this.setState(retosParticipacion));

	}

	fetchChallenge() {
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

	render() {

		const retosWin = this.state.retosParticipacion.map((retoP, i) =>{

			return (
				<div key={i} style={{width: "80%"}} >
					<Panel bsStyle="success">	
				    	<Panel.Heading>
				      		<Panel.Title toggle>{retoP}</Panel.Title>
				    	</Panel.Heading>
				    	<Panel.Body >
				    		<p>Puntos al ganar el reto: </p>
			          		<p>Tiempo en segundos:</p>
			          		<p>Descripción: </p>
			          		<p>USUARIO: </p>
					      	<p>Fecha en que termina: </p>
					      	
				    	</Panel.Body>
					</Panel>
				</div>
			)
			
		});

		return(

	        <div className= "container">
	        	<div className="row">			    		
		            	{retosWin}
		    	</div>	

	        </div>	
		)
	}

}


export default ChallengeOnAir;