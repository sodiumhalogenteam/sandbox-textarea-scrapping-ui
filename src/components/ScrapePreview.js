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

const markText = (text, pattern, onClick) => {
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
            <mark key={index} onClick={onClick}>
              {matches[index]}
            </mark>,
          ]
        : [...arr, element],
    [],
  );
};

class ScrapePreview extends Component {
  handleMarkedClick = () => {
    console.log('test');
  };

  render() {
    const cleanText = this.props.textValue.replace(/\n$/g, '\n\n');
    const marked = markText(cleanText, /[A-Z].*?\b/g, this.handleMarkedClick);
    return <Styles>{marked}</Styles>;
  }
}

export default ScrapePreview;
