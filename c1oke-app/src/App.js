import './App.css';

function App() {
  function getEncodeArray(spaceIndex) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    alphabet.splice(spaceIndex - 1, 0, ' ');
    return alphabet;
  }

  function encodeMessage(key, message) {
    const keyArray = key.split(' ');
    const keyLength = keyArray.length;
    const spaceIndex = keyArray.shift();
    const encodeArray = getEncodeArray(spaceIndex);
    const messageArray = message.split('');
    let keyIndex = 0;
    let result = '';
    console.log(keyArray);
    messageArray.forEach((letter, index) => {
      if (keyIndex > keyLength) {
        keyIndex = 0;
      } else {
        keyIndex += 1;
      }
      const shiftIndex = parseInt(keyArray[keyIndex]);
      const letterIndex = encodeArray.indexOf(letter);
      const totalShift = letterIndex + shiftIndex;
      const encodedLetter = encodeArray[totalShift];
      console.log('shift index', shiftIndex);
      console.log('total shift', totalShift);
      console.log(`${letter} = ${encodedLetter}`);
      result = result.concat(encodedLetter)
    });
    return result;
  }

  const key = '7 9 12 0 -4 -4 3 -2';
  const message = 'hello world';

  const encodedMessage = encodeMessage(key, message);
  
  return (
    <div className="App">
      <header className="App-header">
        {encodedMessage}
      </header>
    </div>
  );
}

export default App;
