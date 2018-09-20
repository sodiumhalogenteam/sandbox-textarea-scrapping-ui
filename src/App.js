import React, {Component} from 'react';
import styled from 'styled-components';
import Textarea from './components/Textarea';
import ScrapePreview from './components/ScrapePreview';

const Styles = styled.div`
  display: flex;
  width: 90vw;
  max-width: 90vw;
  padding: 10%;
  & > div {
    margin: 30px;
  }
`;

class App extends Component {
  state = {
    text:
      'An attack on the information systems of Hancock Health was initiated by an as-yet unidentified criminal group.  The attack used ransomware, a kind of computer malware that locks up computers until a ransom is paid, usually in the form of Bitcoin.  Through the effective teamwork of the Hancock technology team, an expert technology consulting group, and our clinical team, Hancock was able to recover the use of its computers, and at this time, there is no evidence that any patient information was adversely affected.   Hancock is continuing to work with national law enforcement to learn more about the incident.  We plan to provide additional information to our community regarding this act soon.',
  };

  handleTextChange = text => {
    this.setState({text});
  };

  render() {
    return (
      <Styles>
        <Textarea textValue={this.state.text} handleTextChange={this.handleTextChange} />
        <ScrapePreview textValue={this.state.text} />
      </Styles>
    );
  }
}

export default App;
