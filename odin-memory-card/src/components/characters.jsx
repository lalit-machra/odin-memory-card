import { useState, useEffect } from 'react'
import '../styles/characters.css'

function displayChar(name, image) {
  return (
    <div className='card'>
      <img src={image}></img>
      <h1>{name}</h1>
    </div>
  );
}

export default function Characters() {
  const [characters, setCharacters] = useState([]);

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

  let charData = characters.length === 0 ? <h1>Data loading.....</h1> : 
    (<div className='cards'>
      {characters.map(character => displayChar(character.name, character.image))}
    </div>)

  return charData;
}