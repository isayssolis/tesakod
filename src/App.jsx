import { useState, useEffect } from "react";
import poke from "./utils/pokemon.json";
/*
Todo:

1.- display the pokemon on the json as a list !Done!
2.- make a service simulating a request using a promise for retrieve the list of pokemon
 !Done!
3.- add a search input to filter the pokemon by name !Done!
4.- add a checkbox to mark the pokemon as registered !Done!
5.- hide the registered pokemon from the list  !vamosAqui!!!!  !Done!
6.- add a button to mark all the pokemon as unregistered  !Done!
*/

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  function getPoke() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(poke);
      }, 100);
    });
  }


  useEffect(() => {
    getPoke().then((r) => {
      let addField = r.map((it) => {
        return { hide: false, ...it }
      });
      setData(addField);
    });
  }, []);


  const filteredData = data.filter((el) => {
    return el.name.includes(text);
  });


  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    // console.log(value);
    // console.log(checked)
    const updatedCheckedState = data.map((item, index) => {
      if (item.name === value) {
        console.log(value, item.name)
        return { ...item, hide: e.target.checked }
      }
      return item

    });
    setData(updatedCheckedState);
  }

  const unregister = () => {
    let unreg = data.map((it) => {
      return { ...it, hide: true }
    });
    setData(unreg);
  }

  return (
    <div className="App">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Buscar..." />
      <ul>
        {filteredData.map((p, i) => {
          const hide = p.hide ? { display: 'none' } : { display: 'block' }
          return (
            <li key={p.name} style={hide}>
              <input
                type="checkbox"
                value={p.name}
                checked={p.hide}
                onChange={handleCheckbox}
              />
              {p.name}
            </li>
          );
        })}
      </ul>
      <button onClick={() => unregister()} ><b>Unregister all</b></button>
    </div>
  );
}

export default App
