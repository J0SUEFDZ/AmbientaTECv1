import React, {Component} from 'react';
import { Panel, PanelGroup, Button, Checkbox } from 'react-bootstrap';

class Challenge extends Component{
	constructor (){
		super();
		this.state = {
			challengeName: '',
			points: '',
			endDate: '',
			time: '',
			description: '',
			challenges:[]
		};
		this.participar = this.participar.bind(this);
	}
	componentDidMount() {
	    this.fetchChallenges();
	}

	participar(event, idCampana, idUser){
		console.log('Checkbox checked:', (event.target.checked));
		console.log('Campana:', idCampana);
		if (event.target.checked){
			console.log('Entra IF');
			fetch('api/participantes', {
				method: 'POST',
						body: JSON.stringify({
							organizador: idUser,
							idCamp: idCampana
						}),
		        headers: {
		          'Accept': 'application/json',
		          'Content-Type': 'application/json'
		        }
			})
			.then(res => res.json())
			.then (data => {
			M.toast({html: 'Se espera su participacion.'});
			})
			.catch(err => console.error(err));
		}else{
			console.log('ELSE');
		    if(confirm('Quieres cancelar la asistencia?')) {
		      fetch(`/api/participantes/${idUser}`, {
		        method: 'DELETE',
		        headers: {
		          'Accept': 'application/json',
		          'Content-Type': 'application/json'
		        }
		      })
		        .then(res => res.json())
		        .then(data => {
		          console.log(data);
		          M.toast({html: 'Asistencia cancelada'});
		          this.fetchTasks();
		        });
		    }
		}
		
		//.catch(err => console.error(err));
		//e.preventDefault();
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
						<Panel eventKey="1">
					    	<Panel.Heading>
					      		<Panel.Title toggle>{reto.challengeName}</Panel.Title>
					    	</Panel.Heading>
					    	<Panel.Body collapsible>
					    		<p>Puntos al ganar el reto: {reto.points}</p>
				          		<p>Tiempo en segundos: {reto.time}</p>
				          		<p>Descripción: {reto.description}</p>
						      	<p>Fecha en que termina: {reto.endDate}</p>
						      	<form>
						      		<p>      
						      			<label>
						      			    <Checkbox inline 
							                	disabled={this.state.disabled}>
										    	Participar
										    </Checkbox>
							            </label>
						      		</p>
						      	</form>
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