import React, {Component} from 'react';
import Navigation from './components/Navigation';
import {Modal, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { auth, providerTwitter, providerFacebook } from '../firebase.js';
import  '../style/style.css';

//SubComponents
import CampForm from './components/CampForm';
import Challenge from './components/Challenge';
import Campaign from './components/Campaign';
import SocialLogin from './components/SocialLogin';
// Esto es JSX: Consiste en javascript con html
//Se necesita el traductor Babel
class App extends Component{
	
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.loginTwitter = this.loginTwitter.bind(this); // <-- add this line
		this.loginFacebook = this.loginFacebook.bind(this); // <-- add this line
		this.logout = this.logout.bind(this); // <-- add this line
		this.insert = this.insert.bind(this);
		this.userExist = this.userExist.bind(this);

		this.state = {
				show: false,
				isLoggedIn: false,
				provider: "",
				userID: "",
				name: "",
				email: "",
				picture: ""
		};
  	}

  	handleClose() {
    	this.setState({ show: false });
  	}

  	handleShow() {
    	this.setState({ show: true });
	}
	
	userExist(user, register){
		fetch(`/api/cuentas/${user.uid}`, {
				method: 'GET',
				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
				}
		})	.then(res => res.json())
			.then(data => 
				{   if(data && !register){
						this.setState({
								isLoggedIn: true,
								provider: data.provider,
								userID: data.uid,
								name: data.name,
								email: data.email,
								picture: user.photoURL
						}); 
					return true;
				}
				if(register && !data){
						const user_data = ({
								provider: user.providerId,
								userID: user.uid,
								name: user.displayName,
								email: user.email
						});
						fetch('/api/cuentas', {
								method: 'POST',
								body: JSON.stringify(user_data),
								headers:{ 
										'Accept': 'application/json',
										'Content-Type':'application/json'
								}
						}).then(res => console.log("User agregado con exito: "+res))
						.catch(err => console.error("ERROR al registrar el usuasrio: "+err))
						this.setState({
								isLoggedIn: true,
								provider: user.providerId,
								userID: user.uid,
								name: user.displayName,
								email: user.email,
								picture: user.photoURL
						}); 
						return false;
				}
				if(data && register)
						console.log("Este usuario no puede ser registrado por que ya lo está.");
						return true;
				})
		.catch(err => console.error(err))

}

	componentDidMount() {
			auth.onAuthStateChanged((user) => {
					if (user) {
							const dataUser = user.providerData.find(function(element){
									return element="providerId";
							});
							this.userExist(dataUser, false);
					} 
					else{
							console.log("No hay nadie conectado.");
							this.setState({ isLoggedIn: false });
					}
			});
	}

	logout() {
			auth.signOut()
			.then(() => {
					this.setState({
							isLoggedIn: false
					});
			});
	}
	insert(result){
			const user = result.user;
			const data = user.providerData.find(function(element){
					return element="providerId";
			});
			this.userExist(data, true);
	}

	loginTwitter() {
			auth.signInWithPopup(providerTwitter).then((result) => {
					this.insert(result);
			});
	}

	loginFacebook() {
			auth.signInWithPopup(providerFacebook).then((result) => {
					this.insert(result);
			});
	}

	render() {
		return(
			<div className ="App">
				<div className="wrapper">
            	{this.state.isLoggedIn ?
                <div className="user-logged">	
                    <img src={this.state.picture} alt={this.state.name} />
                    <p>Estás logueado con {this.state.provider}</p>
                    <p>Bienvenido {this.state.name}</p>
                 <p><strong>Email:</strong> {this.state.email} </p>
                    <button onClick={this.logout}>LOG OUT</button>
                </div>   
                :
                <div>
                    <button className="btn-twitter" onClick={this.loginTwitter}>
                          LOGIN WITH TWITTER
                    </button>
                    <button className="btn-facebook" onClick={this.loginFacebook}>
                          LOGIN WITH FACEBOOK
                    </button>
                </div>         
            	}
				<img className="img-portada" src="https://noticias.utpl.edu.ec/sites/default/files/imagenes_editor/gestion_ambiental-02.jpg" alt="Portada" />
				<Navbar id="navver" inverse collapseOnSelect >
					<Navbar.Header>
				    	<Navbar.Brand>
				      		<a href="#brand">AmbientaTEC</a>
				    	</Navbar.Brand>
				    	<Navbar.Toggle />
				  	</Navbar.Header>
				  		<Navbar.Collapse>
					    	<Nav>
					      		<NavItem eventKey={1} href="#hashtag">
					        		Hashtag
					      		</NavItem>
					      		<NavItem eventKey={2} href="#campanha">
					        		Campañas
					      		</NavItem>
					    	</Nav>
				  		</Navbar.Collapse>
				</Navbar>
				{this.state.isLoggedIn?
					<div className="content">
						<div className="element-wrapper">
							<a><img className="element-icon" src="https://cdn1.iconfinder.com/data/icons/material-audio-video/22/loop-512.png" alt="Report"/></a>
							<p className="element-title">Consejo del Día</p>
							<a><img className="element-icon" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/info-512.png" alt="Info"/></a>
							<img className="element-img" src={this.state.picture} alt="Info"/>
							<p>Este es {this.state.name}, cuyo correo es {this.state.email}</p>
						</div>
						<div className="element-wrapper">
							<a><img className="element-icon" src="https://cdn1.iconfinder.com/data/icons/material-audio-video/22/loop-512.png" alt="Report"/></a>
							<p className="element-title">Recomendaciones</p>
							<a><img className="element-icon" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/info-512.png" alt="Info"/></a>
							<img className="element-img" src={this.state.picture} alt="Info"/>
							<p>Este es {this.state.name}, cuyo correo es {this.state.email}</p>
						</div>
						<div className= "title-separator">
							<a href="#navver"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Hashtag"/></a>
							<h3 id="hashtag">Generar Hashtag</h3>
						</div>
						<div className= "title-separator">
							<a href="#navver"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Campañas"/></a>
							<h3 id="campanha">Campañas</h3>
						</div>
						<h5>Si desea enviar una solicitud para organizar una campaña presione el siguiente boton.</h5>
						<Button bsStyle="success" bsSize="large" onClick={this.handleShow}>
							Enviar solicitud
						</Button>		 
						       	
						<div className= "container">
							<Modal show={this.state.show} onHide={this.handleClose}>
								<Modal.Header closeButton>
									<Modal.Title>Solicitar campaña</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<CampForm usuario={this.state}/>
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={this.handleClose}>Close</Button>
								</Modal.Footer>
							</Modal>
						</div>
						<h5>Puede participar en cualquiera de las siguientes campañas, solo marquela con un check.</h5>			    
						<Campaign/>

						<div className= "title-separator">
							<a href="#navver"><img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/65-512.png" alt="Retos"/></a>
							<h3 id="reto">Challenges</h3>
						</div>	 
						       	
						<h5>Puede participar en cualquiera de los siguientes retos.</h5>			    
						<Challenge usuario={this.state}/>

					</div>
				:
					<div className="not-connected">
						<p className="title-not-connected" >Parece que todavía no estás conectado :(</p>
						<p className="not-connected-text">Para acceder a este contenido deberás conectarte con alguna de tus redes sociaes, Facebook o Twitter.</p>
					</div>
				}
				</div>
				<footer>
					<p id="footer">Desarrollado por Josué Fernández, Wilbert Gonzalez y Geovanny Burgos</p>
				</footer>
			</div>
		)
	}
}

export default App;