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

  markText = (text, unqiueWordMatches, pattern, onClick) => {
    const splitText = text.split(pattern);
    if (splitText.length <= 1) {
      return text;
    }
    const matches = text.match(pattern);

    // put full text back together
    const fullTextSplit = splitText.reduce((arr, element, index) => {
      if (!matches[index]) return [...arr, element];
      return [...arr, element, matches[index]];
    }, []);

    // add <Mark/> to text
    return fullTextSplit.map((element, index) => {
      let isSelected = false;
      let matchId = null;
      const isAMatch = unqiueWordMatches.some(item => {
        if (element === item.text) {
          isSelected = item.selected;
          matchId = item.id;
          return true;
        }
        return false;
      });

      // no match
      if (!isAMatch) return element;
      // match found
      return [
        <Mark key={index} selected={isSelected} onClick={() => onClick(matchId, isSelected)}>
          <mark>{element}</mark>
        </Mark>,
      ];
    }, []);
  };

  render() {
    const cleanText = this.props.textValue.replace(/\n$/g, '\n\n');
    const marked = this.markText(cleanText, this.props.notedText, this.props.regex, this.handleMarkedClick);
    return (
      <Styles>
        <div>{marked}</div>
      </Styles>
    );
  }
}

export default ScrapePreview;
