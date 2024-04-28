import './App.css';

function App() {
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

  const key = '7 9 12 0 -4 -4 3 -2';
  const message = 'great news family we are having takeout tonight';

  const encodedMessage = encodeMessage(key, message);
  
  return (
    <div className="App">
      <header className="App-header">
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
        {encodedMessage}
      </header>
    </div>
  );
}

export default App;
