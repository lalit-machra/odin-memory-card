import { useState, useEffect } from 'react'
import '../styles/characters.css'

function rearrangeArr(arr) {
  let reArr = [];
  let randomIndexArr = [];
  let randomIndex;
  for (let i = 0; i < arr.length; i++) {
    if (randomIndex === undefined) {
      randomIndex = Math.floor(Math.random() * (arr.length));
      randomIndexArr.push(randomIndex);
    } else {
      randomIndex = Math.floor(Math.random() * (arr.length));
      while (randomIndexArr.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * (arr.length));
      }
      randomIndexArr.push(randomIndex);
    }
    reArr[i] = arr[randomIndex];
  }
  return reArr;
}

function displayCharacter(id, name, image, handleClick) {
  return (
    <div className='card' key={id} onClick={() => handleClick(id)}>
      <img src={image}></img>
      <h1>{name}</h1>
    </div>
  );
}

let charClicked = [];
let allScores = [];
let bestScore = 0;
export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function getChar() {
      const response = await fetch('https://hp-api.onrender.com/api/characters', {mode: 'cors'});
      const data = await response.json();
      const tenCharacters = data.slice(0, 10);
      tenCharacters.forEach(character => {
        if (!ignore) {
          return setCharacters(characters =>  
            [...characters, {id: character.id, name: character.name, image: character.image}]);
        }
      });
    }

    getChar();

    return (() => ignore = true);
  }, []);

  function handleClick(id) {
    if (charClicked.includes(id)) {
      console.log('if is running');
      allScores.push(score);
      bestScore = allScores.reduce((best, curr) => {
        if (curr > best) {
          best = curr;
        }
        return best;
      });
      charClicked.splice(0, charClicked.length);
      setScore(0);
    } else {
      console.log('else is running, value of score is: ', score);
      charClicked.push(id);
      setScore(score + 1);
    }

    let newOrderArr = rearrangeArr(characters);
    setCharacters(newOrderArr);
  }

  let charData = characters.length === 0 ? <h1>Loading characters.....</h1> : 
    (<>
      <div className='scoreCard'>
        <p className='score'>Score: {score}</p>
        <p className='bestScore'>Best Score: {bestScore}</p>
      </div>
      <div className='cards'>
        {characters.map(character => 
          displayCharacter(character.id, character.name, character.image, handleClick))}
      </div>
    </>)

  return charData;
}