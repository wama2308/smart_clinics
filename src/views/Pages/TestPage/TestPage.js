import React, { Component } from 'react';
import { Card, Row } from 'reactstrap';

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
				var movieInfo = <Card>{movie}</Card>;
				return movieInfo;				
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