import React, {Component} from 'react';
import {ProgressBar, Modal, Panel, PanelGroup, Button, Checkbox } from 'react-bootstrap';

class ChallengeModel extends Component{
	constructor (){
		super();
		this.state = {
			userId: '',
			_id: '',
			challengeName: '',
			points: '',
			endDate: '',
			time: 0,
			description: '',
			show: false
		};
		this.handleShow = this.handleShow.bind(this);
		this.participar = this.participar.bind(this);
		
	}

	componentDidMount() {
		const newReto=this.props.newReto;
		const usuario = this.props.user;
		this.setState({
			userId: usuario,
			_id: newReto._id,
			challengeName: newReto.challengeName,
			points: newReto.points,
			endDate: newReto.endDate,
			time: newReto.time,
			description: newReto.description
		})
	}

  	handleShow() {
    	this.setState({ show: true });
    	setTimeout(() => {
			this.setState({ show: false })
		}, this.state.time);
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

	render() {
		
		return (
			<div key={this.state._id} style={{width: "80%"}} >
		      	<form>
		      		<p>      
		      			<label>
		      			    <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
								Participar
							</Button>
			            </label>
		      		</p>
		      	</form>

				<div className= "container">
					<Modal show={this.state.show} >
						<Modal.Header >
							<Modal.Title>{this.state.challengeName}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ProgressBar active now={45} />
							{this.state.userId}
							<h4>Wrapped Text</h4>

							<p>PURAAAA HABLAAADAAAAAA</p>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.handleClose}>Listo</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		)
	}

}


export default ChallengeModel;