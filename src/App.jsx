import { useState } from "react";
import poke from "./utils/pokemon.json";
/*
Todo:

1.- display the pokemon on the json as a list !Done!
2.- make a service simulating a request using a promise for retrieve the list of pokemon
 !Done!
3.- add a search input to filter the pokemon by name !Done!
4.- add a checkbox to mark the pokemon as registered !Done!
5.- hide the registered pokemon from the list  !vamosAqui!!!!
6.- add a button to mark all the pokemon as unregistered
*/

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [reg, setReg] = useState(false);

  function getPoke() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(poke);
      }, 100);
    });
  }

  function renderList() {
    getPoke().then((r) => {
      setData(r);
    });
  }

  const filteredData = data.filter((el) => {
    return el.name.includes(text);
  });

  function onHide(e, i) {
    console.log(e.target.checked);
  }

  return (
    <div className="App">
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ul>
        {filteredData.map((p, i) => {
          return (
            <li>
              <input
                type="checkbox"
                checked={false}
                onChange={(e) => {
                  onHide(e, i);
                }}
              />
              {p.name}
            </li>
          );
        })}
      </ul>
      {renderList()}
    </div>
  );
}

export default App
