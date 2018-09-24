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
  user-select: none;

  mark {
    border: 1px solid #444;
    padding: 0 5px;
    background: none;
    cursor: pointer;
  }
`;

class ScrapePreview extends Component {
  handleMarkedClick = (id, text) => {
    console.log('clicked', id, text);
    this.props.handleTextSelected(id, text);
  };

  markText = (text, pattern, onClick) => {
    const splitText = text.split(pattern);
    if (splitText.length <= 1) {
      return text;
    }

    const matches = text.match(pattern);
    return splitText.reduce(
      (arr, element, index) =>
        matches[index]
          ? [
              ...arr,
              element,
              <mark key={index} onClick={() => onClick(index, matches[index])}>
                {matches[index]}
              </mark>,
            ]
          : [...arr, element],
      [],
    );
  };

  render() {
    const cleanText = this.props.textValue.replace(/\n$/g, '\n\n');
    const marked = this.markText(cleanText, /[A-Z].*?\b/g, this.handleMarkedClick);
    return <Styles>{marked}</Styles>;
  }
}

export default ScrapePreview;
