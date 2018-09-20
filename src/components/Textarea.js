import React, {Component} from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  outline: none;
  width: 40%;
  textarea {
    font-size: 18px;
    width: 100%;
    height: 500px;
    padding: 12px 15px;
    line-height: 1.5em;
  }
`;

class Textarea extends Component {
  handleChange(event) {
    this.props.handleTextChange(event.target.value);
  }

  render() {
    return (
      <Styles>
        <textarea
          name="body"
          onChange={e => this.handleChange(e)}
          placeholder="paste text"
          value={this.props.textValue}
        />
      </Styles>
    );
  }
}

export default Textarea;
