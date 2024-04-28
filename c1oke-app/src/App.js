import { useState } from 'react';
import './App.css';
import { Box, Button, Card, Tabs, Tab, TextField, Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [ encodedMessage, setEncodedMessage ] = useState('');
  const [ key, setKey ] = useState('');
  const [ inputMessage, setInputMessage ] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function getEncodeArray(spaceIndex) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    alphabet.splice(spaceIndex - 1, 0, ' ');
    return alphabet;
  }

  function encodeMessage(key, message) {
    const keyArray = key.split(' ');
    const spaceIndex = keyArray.shift();
    const encodeArray = getEncodeArray(spaceIndex);
    const messageArray = message.split('');
    let keyIndex = 0;
    let result = '';
    messageArray.forEach((letter, index) => {
      if (keyIndex + 1 === keyArray.length) {
        keyIndex = 0;
      }
      const shiftIndex = parseInt(keyArray[keyIndex]);
      const letterIndex = encodeArray.indexOf(letter);
      let totalShift = letterIndex + shiftIndex;
      while (totalShift < 0) {
        totalShift += encodeArray.length;
      }
      while (totalShift + 1 > encodeArray.length) {
        totalShift -= encodeArray.length;
      }
      const encodedLetter = encodeArray[totalShift];
      console.log(`${letter} = ${encodedLetter}`);
      result = result.concat(encodedLetter);
      keyIndex += 1;
    });
    return result;
  }

  function onSubmit() {
    const result = encodeMessage(key, inputMessage);
    setEncodedMessage(result);
  }

  return (
    <div className="App">
      <header className="App-header">
        C1oak Secret Message Encoder / Decoder
      </header>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Encoder" />
          <Tab label="Decoder" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <Typography variant="h2" sx={{ mb: 2 }}>Encode a Message</Typography>
        <form sx={{ width: '60%' }}>
          <TextField 
              sx={{ margin: '16px', width: "60%" }} 
              id="key" value={key} 
              label="Key" 
              variant="outlined" 
              placeholder='Key' 
              onChange={(e) => setKey(e.target.value)}
              helperText="Please enter a series, including only positive and negative integers, with a single space in between"
            />
            <TextField 
              sx={{ margin: '16px', width: "60%" }} 
              id="message" 
              value={inputMessage} 
              label="Message" 
              variant="outlined" 
              placeholder='Message'
              onChange={(e) => setInputMessage(e.target.value.toLowerCase())}
              helperText="No punctuation or numbers allowed (yet)" 
            />
            <Button sx={{ margin: '16px', width: "60%" }} variant="contained" onClick={onSubmit}>Submit</Button>
        </form>
          <Box>
            <Card variant="outlined" sx={{ borderRadius: '6px', my: 3, mx: 'auto', padding: 2, width: '58%', backgroundColor: '#555555' }}>
              <Typography sx={{ color: '#414141' }} variant="h4">
                {encodedMessage}
              </Typography>
            </Card>
          </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Typography variant="h2">Decode a Message</Typography>
      </TabPanel>
    </div>
  );
}

export default App;
