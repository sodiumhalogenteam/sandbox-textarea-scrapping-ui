import React, {Component} from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  outline: none;
  width: 40%;
  input {
    font-size: 18px;
    width: 100%;
    height: 40px;
    padding: 12px 15px;
    line-height: 1.5em;
  }
`;

class Search extends Component {
  handleChange(event) {
    this.props.handleSearchChange(event.target.value);
  }

  render() {
    return (
      <Styles>
        <input type="text" onChange={e => this.handleChange(e)} placeholder="regex here" value={this.props.textValue} />
      </Styles>
    );
  }
}

export default Search;
