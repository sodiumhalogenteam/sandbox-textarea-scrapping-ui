import React, {Component} from 'react';
import styled from 'styled-components';
import Textarea from './components/Textarea';
import ScrapePreview from './components/ScrapePreview';

const Styles = styled.div``;
const Nav = styled.div``;
const Views = styled.div`
  display: flex;
  width: 90vw;
  max-width: 90vw;
  padding: 4%;
  & > div {
    margin: 30px;
  }
  & > div > div {
    display: flex;
  }
  .list {
    border: 1px solid #ccc;
    width: 20%;
    li {
      &.selected {
        background: green;
        color: white;
        padding: 4px 5px;
      }
    }
  }
`;

class App extends Component {
  state = {
    isViewInput: true,
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

  handleTextSelected = (id, text, add = true) => {
    console.log('state:', this.state.notedText, ' add:', add, id, text);
    if (add) {
      // add to notedText
      const notedText = this.state.notedText;
      notedText.push({
        id: id,
        text: text,
        selected: true,
      });
      console.log('add', notedText, text);
      this.setState({notedText});
    } else {
      const notedText = this.state.notedText.map(item => {
        // console.log(item, item.text, text, item.text === text, {...item, selected: false});
        if (item.text === text) return {...item, selected: false};
        return item;
      });
      console.log('after remove', notedText, text);
      // remove from notedText
      this.setState({notedText});
    }
  };

  collectNotedWords = (text, pattern) => {
    const splitText = text.split(pattern);
    if (splitText.length <= 1) {
      return text;
    }

    const matches = text.match(pattern);
    const uniqueMatches = [...new Set(matches)]; // ES6 remove duplicates from array
    return uniqueMatches.map((match, index) => ({id: index, text: match, selected: false}));
  };

  toggleView = () => {
    this.setState({isViewInput: !this.state.isViewInput});

    const notedText = this.collectNotedWords(this.state.text, /[A-Z].*?\b/g);
    console.log(this.state.isViewInput, notedText);
    this.setState({notedText});
  };

  render() {
    return (
      <Styles>
        <Nav>
          <button onClick={this.toggleView}>{this.state.isViewInput ? 'Next' : 'Back'}</button>
        </Nav>
        <Views>
          {this.state.isViewInput ? (
            <Textarea textValue={this.state.text} handleTextChange={this.handleTextChange} />
          ) : (
            <div>
              <ScrapePreview
                textValue={this.state.text}
                notedText={this.state.notedText}
                handleTextSelected={this.handleTextSelected}
              />
              <div className="list">
                <ul>
                  {this.state.notedText.map((el, index) => {
                    if (el.selected) {
                      return (
                        <li className="selected" key={index}>
                          {el.text}
                        </li>
                      );
                    }
                    return <li key={index}>{el.text}</li>;
                  })}
                </ul>
              </div>
            </div>
          )}
        </Views>
      </Styles>
    );
  }
}

export default App;
