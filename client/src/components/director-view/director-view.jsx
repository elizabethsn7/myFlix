import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

/**
 * Director information view
 * @function DirectorView
 * @param {string} props - movie.director.name props
 * @returns {DirectorView}
 */

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director } = this.props;
    if (!director) return null;

    return (
      <Container>
        <Row>
          <div>
            <div className="director-name">{ director.Name }</div>
            <div className="director-bio">
              <span className="value">{ director.Bio }</span>
            </div>
            <div className="director-bio">
              <span className="value">{ director.Birth }</span>
            </div>
            <Link to="/">
              <Button className="backButton">Back to Movies</Button>
            </Link>
          </div>
        </Row>
      </Container>
    );
  }
}
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.number,
  }).isRequired,
};
export default DirectorView;
