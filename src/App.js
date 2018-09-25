import React, {Component} from 'react';
import styled from 'styled-components';
import Textarea from './components/Textarea';
import ScrapePreview from './components/ScrapePreview';
import Search from './components/Search';

const Styles = styled.div``;
const Nav = styled.div``;
const Views = styled.div`
  /* display: flex; */
  width: 90vw;
  max-width: 90vw;
  padding: 4%;
  & > div {
    margin: 30px;
  }
  button {
    background: #b5b5b5;
    color: white;
    padding: 13px 24px;
    font-size: 1.2em;
  }
  .side-by-side {
    display: flex;
  }
  .list {
    line-height: 1.7em;
    border: 1px solid #ccc;
    width: 40%;
    max-width: 90vw;
    padding: 20px 40px;
    margin: 0 30px;
    li {
      width: 50%;
      border: 1px solid transparent;
      span {
        padding: 4px 5px;
      }
      cursor: pointer;
      &:hover span {
        border: 1px solid #444;
      }
      &.selected > span {
        border: 1px solid green;
        background: green;
        color: white;
      }
    }
  }
`;

class App extends Component {
  state = {
    isViewInput: true,
    regex: /[A-Z].*?\b/g,
    text:
      'An attack on the information systems of Hancock Health was initiated by an as-yet unidentified criminal group.  The attack used ransomware, a kind of computer malware that locks up computers until a ransom is paid, usually in the form of Bitcoin.  Through the effective teamwork of the Hancock technology team, an expert technology consulting group, and our clinical team, Hancock was able to recover the use of its computers, and at this time, there is no evidence that any patient information was adversely affected.   Hancock is continuing to work with national law enforcement to learn more about the incident.  We plan to provide additional information to our community regarding this act soon.',
    notedText: [
      {
        id: 0,
        text: 'An',
        selected: false,
      },
      {
        id: 1,
        text: 'Hancock',
        selected: true,
      },
    ],
  };

  handleTextChange = text => {
    this.setState({
      text,
    });
  };

  handleSearchChange = regex => {
    this.setState({
      regex,
    });
  };

  handleTextSelected = (id, isSelected) => {
    const notedText = this.state.notedText.map(item => {
      if (item.id === id) return {...item, selected: !isSelected};
      return item;
    });
    this.setState({notedText});
  };

  getUniqueListOfMatchingWords = (text, pattern) => {
    const splitText = text.split(pattern);
    if (splitText.length <= 1) {
      return text;
    }

    const matches = text.match(pattern);
    const uniqueMatches = [...new Set(matches)]; // ES6 remove duplicates from array
    return uniqueMatches.map((match, index) => ({id: index, text: match, selected: false}));
  };

  toggleView = () => {
    const notedText = this.getUniqueListOfMatchingWords(this.state.text, this.state.regex);
    this.setState({isViewInput: !this.state.isViewInput, notedText});
  };

  render() {
    return (
      <Styles>
        <Views>
          {this.state.isViewInput ? (
            <Textarea textValue={this.state.text} handleTextChange={this.handleTextChange} />
          ) : (
            <div>
              <Search handleSearchChange={this.handleSearchChange} textValue={this.state.regex} />
              <div className="side-by-side">
                <ScrapePreview
                  textValue={this.state.text}
                  notedText={this.state.notedText}
                  regex={this.state.regex}
                  handleTextSelected={this.handleTextSelected}
                />
                <div className="list">
                  <ul>
                    {this.state.notedText.map((el, index) => {
                      if (el.selected) {
                        return (
                          <li
                            className="selected"
                            key={index}
                            onClick={e => this.handleTextSelected(el.id, el.selected)}>
                            <span>{el.text}</span>
                          </li>
                        );
                      }
                      return (
                        <li key={index} onClick={e => this.handleTextSelected(el.id, el.selected)}>
                          <span>{el.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <Nav>
            <button onClick={this.toggleView}>{this.state.isViewInput ? 'Next >>' : '<< Back'}</button>
          </Nav>
        </Views>
      </Styles>
    );
  }
}

export default App;
