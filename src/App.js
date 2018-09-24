import React, {Component} from 'react';
import styled from 'styled-components';
import Textarea from './components/Textarea';
import ScrapePreview from './components/ScrapePreview';

const Styles = styled.div`
  display: flex;
  width: 90vw;
  max-width: 90vw;
  padding: 4%;
  & > div {
    margin: 30px;
  }
  .list {
    border: 1px solid #ccc;
    width: 20%;
  }
`;

class App extends Component {
  state = {
    text:
      'An attack on the information systems of Hancock Health was initiated by an as-yet unidentified criminal group.  The attack used ransomware, a kind of computer malware that locks up computers until a ransom is paid, usually in the form of Bitcoin.  Through the effective teamwork of the Hancock technology team, an expert technology consulting group, and our clinical team, Hancock was able to recover the use of its computers, and at this time, there is no evidence that any patient information was adversely affected.   Hancock is continuing to work with national law enforcement to learn more about the incident.  We plan to provide additional information to our community regarding this act soon.',
    notedText: [
      {
        id: 1,
        text: 'Hancock',
        selected: true,
      },
    ],
  };

  handleTextChange = text => {
    this.setState({text});
  };

  handleTextSelected = (id, text, add = true) => {
    if (add) {
      const allNoted = this.state.notedText;
      const newNoted = allNoted.push({
        id: id,
        text: text,
      });
      this.setState({notedText: newNoted});
    }
    console.log('text removed from array', text);
    return true;
  };

  render() {
    return (
      <Styles>
        <Textarea textValue={this.state.text} handleTextChange={this.handleTextChange} />
        <ScrapePreview
          textValue={this.state.text}
          selected={this.state.notedText.map(el => {
            if (el.selected) return true;
          })}
          handleTextSelected={this.handleTextSelected}
        />
        <div className="list">
          <ul>
            {this.state.notedText.map((el, index) => {
              if (el.selected) {
                return <li key={index}>{el.text}</li>;
              }
            })}
          </ul>
        </div>
      </Styles>
    );
  }
}

export default App;
