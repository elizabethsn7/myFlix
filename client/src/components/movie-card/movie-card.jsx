import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

export class MovieCard extends React.Component {
	render() {
		// This is given to the < MovieCard/> component by the outer world
		// which in this case is  'MainView', as 'MainView'
		// is what's connected to your database via the movies
		// endpoint of your API
		const { movie, onClick } = this.props;
		return (
			<CardColumns>
				<Card style={{ width: "16rem" }}>
					<Card.Img variant="top" src={movie.ImagePath} />
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
						<Card.Text>{movie.Description}</Card.Text>
						<Button onClick={() => onClick(movie)} variant="link">
							Open
						</Button>
					</Card.Body>
				</Card>
			</CardColumns>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired
	}).isRequired,
	onClick: PropTypes.func.isRequired
};
