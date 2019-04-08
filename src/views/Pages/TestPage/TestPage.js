import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const url = "http://www.omdbapi.com/?i=tt3896198&apikey=d1d000b5";


class TestPage extends Component {

	constructor(){
		super();
		this.state = {
			movies: []
		}
	}

	getMovies(){
		fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((movies) =>{
			for(var movie in movies){
				// document.selectorQuey('#showMovies').innerHTML ='<Col>'+movie.Title+'</Col>';
				// document.selectorQuey('#showMovies').innerHTML ='<Col>'+movie.Year+'</Col>';
				// document.selectorQuey('#showMovies').innerHTML ='<Col>'+movie.Runtime+'</Col>';
				var movieInfo = <Card>{movie}</Card>;
				return movieInfo;
				console.log(movies);
			}
			
		})
	}

	render(){
		return(
			<Card>
				<h1 className="text-center">Some Content</h1>
				<Row>
					{this.getMovies()}
				</Row>
			</Card>
		)
	}
}

export default TestPage;