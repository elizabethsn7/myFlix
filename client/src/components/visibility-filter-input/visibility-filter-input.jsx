import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="filter"
    />
  );
}
// Notice that it, (VisibilityFilterInput), already has visibilityFilter in its props. This is because you’ll be passing the same visibilityFilter prop you have in the MoviesList component—something only possible because the VisibilityFilterInput component you just created will be used as a sub-component of MoviesList

export default connect(null, { setFilter })(VisibilityFilterInput);
