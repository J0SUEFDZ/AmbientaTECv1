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
		this.participarReto = this.participarReto.bind(this);
		
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

	participarReto(){
			fetch(`/api/cuentas/${this.state.userId}`, {
				method: 'PUT',
						body: JSON.stringify({
							idReto: this.state._id
						}),
		        headers: {
		          'Accept': 'application/json',
		          'Content-Type': 'application/json'
		        }
			})
			.then(res => res.json())
			.then (data => {
				console.log(data.id)
			})
			.catch(err => console.error(err));

	}

	render() {
		
		return (
			<div key={this.state._id} style={{width: "80%"}} >
		      	<form>
		      		<p>      
		      			<label>
		      			    <Button bsStyle="primary" bsSize="large" onClick={this.participarReto}>
								Participar
							</Button>
			            </label>
		      		</p>
		      	</form>
			</div>
		)
	}

}


export default ChallengeModel;