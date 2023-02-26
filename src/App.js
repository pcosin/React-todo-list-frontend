import { useEffect, useState } from "react";
import iconoHead from "../src/assets/img/icon-2.svg";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <main className="App">
      <div className="mainCard">
        <div className="title">
          <img className="icon-app" src={iconoHead} alt="" />
        </div>
        <div>
          <form action="">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              name="task"
              placeholder="Nombre de la tarea"
              className="inputForm"
              autocomplete="off"
              data-form-input
            />
            <button
              type="submit"
              className="button-52"
              data-form-btn
              onClick={
                isUpdating
                  ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                  : () => addToDo(text, setText, setToDo)
              }
            >
              {isUpdating ? "Modificar" : "Agregar"}
            </button>
          </form>
        </div>
        <ul className="cardsList" data-list>
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
