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
`;

const Mark = styled.span`
  mark {
    padding: 0 5px;
    background: ${props => {
      if (props.selected) return 'green';
      return 'none';
    }};
    color: ${props => {
      if (props.selected) return 'white';
      return 'inherit';
    }};
    border: ${props => {
      if (props.selected) return '1px solid green';
      return '1px solid #444';
    }};
    cursor: pointer;
  }
`;

class ScrapePreview extends Component {
  handleMarkedClick = (id, text) => {
    this.props.handleTextSelected(id, text);
  };

  markText = (text, pattern, onClick) => {
    const splitText = text.split(pattern);
    if (splitText.length <= 1) {
      return text;
    }

    const matches = text.match(pattern);
    return splitText.reduce((arr, element, index) => {
      const isSelected = this.props.notedText.filter(obj => {
        return obj.selected;
      }).length;

      console.log('selected', isSelected);

      // no match
      if (!matches[index]) return [...arr, element];
      return [
        ...arr,
        element,
        <Mark key={index} selected={isSelected} onClick={() => onClick(index, matches[index], true)}>
          <mark>{matches[index]}</mark>
        </Mark>,
      ];
    }, []);
  };

  render() {
    const cleanText = this.props.textValue.replace(/\n$/g, '\n\n');
    const marked = this.markText(cleanText, /[A-Z].*?\b/g, this.handleMarkedClick);
    return (
      <Styles>
        <div>{marked}</div>
      </Styles>
    );
  }
}

export default ScrapePreview;
