import React, {Component} from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  width: 40%;
  min-width: 100px;
  height: 500px;
  border: 1px solid #ccc;
  font-size: 18px;
  padding: 12px 15px;
  line-height: 1.5em;

  mark {
    border: 1px solid #444;
    padding: 0 5px;
    background: none;
    cursor: pointer;
  }
`;

class Textarea extends Component {
  applyHighlights = () => {
    return this.props.textValue
      .replace(/\n$/g, '\n\n')
      .replace(/[A-Z].*?\b/g, '<mark onClick={this.handleMarkedClick}>$&</mark>');
  };

  handleMarkedClick = () => {
    console.log('test');
  };

  render() {
    return <Styles dangerouslySetInnerHTML={{__html: this.applyHighlights()}} />;
  }
}

export default Textarea;
