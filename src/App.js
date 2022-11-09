import "./App.css";
import TodoCreator from "./components/TodoCreator";
import TodoBlock from "./components/TodoBlock";
import TodoItem from "./components/TodoItem";
import { useCallback, useState } from "react";
import RecycleBin from "./components/RecycleBin";
import Modal from "./components/Modal";
import DelItem from "./components/DelItem";
import Select from "./components/Select";
import { options } from "./constants/options";
import Search from "./components/Search";

// {
//   id: Date.now(),
//     innerText: ""
// }

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [delItems, setDelItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [id, setId] = useState(options[2].id);
  const [search, setSearch] = useState("");
  const [tempArr, setTempArr] = useState([]);

  const handleClick = () => {
    if (!text.trim()) {
      return undefined;
    }
    setTodo((prevState) => [
      ...prevState,
      { id: Date.now(), todoText: text, checked: false },
    ]);
    (id === 2 || id === 3) &&
      setSelected((prevState) => [
        ...prevState,
        { id: Date.now(), todoText: text, checked: false },
      ]);

    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onChecked = (arg) => {
    setTodo((prevState) =>
      prevState.map((el) =>
        el.id === arg ? { ...el, checked: !el.checked } : el
      )
    );
    let changedItem = todo.find((el) => el.id === arg);
    (id === 1 || id === 2) &&
      setSelected(selected.filter((el) => el.id !== changedItem.id));
    id === 3 &&
      setSelected((prevState) =>
        prevState.map((el) =>
          el.id === arg ? { ...el, checked: !el.checked } : el
        )
      );
  };

  const onDelete = (idEl) => {
    setDelItems((prevState) => [
      ...prevState,
      todo.find((el) => el.id === idEl),
    ]);
    setTodo(todo.filter((el) => el.id !== idEl));

    setSelected(selected.filter((el) => el.id !== idEl));
  };

  const openBin = () => {
    setIsOpen(!isOpen);
  };

  const outBin = (id) => {
    setDelItems(delItems.filter((el) => el.id !== id));
  };
  const onReestab = (idEl) => {
    console.log("id in bin", id);
    setTodo((prevState) => [
      ...prevState,
      delItems.find((el) => {
        return el.id === idEl;
      }),
    ]);
    switch (id) {
      case 3:
        setSelected((prevState) => [
          ...prevState,
          delItems.find((el) => {
            return el.id === idEl;
          }),
        ]);

        break;
      case 1:
        {
          let theElement = delItems.find((el) => {
            return el.id === idEl && el.checked;
          });
          if (theElement) {
            setSelected((prevState) => [...prevState, theElement]);
          }
        }

        break;

      case 2:
        {
          let theElement = delItems.find((el) => {
            return el.id === idEl && !el.checked;
          });
          if (theElement) {
            setSelected((prevState) => [...prevState, theElement]);
          }
        }
        break;
      default:
        return undefined;
    }
    setDelItems(delItems.filter((el) => el.id !== idEl));
  };

  const onSelect = useCallback(
    (newId) => {
      setId(newId);
      switch (newId) {
        case 1:
          setSelected(todo.filter((el) => el.checked));
          break;
        case 2:
          setSelected(todo.filter((el) => !el.checked));
          break;
        case 3:
          setSelected(todo);
          console.log("3-th case");
          break;
        default:
          return undefined;
      }
    },
    [todo]
  );
  const handleSearch = (event) => {
    setTempArr(
      selected.filter((el) => el?.todoText.includes(event.target.value))
    );
    setSearch(event.target.value);
  };

  console.log("current id", id);
  console.log("todo", todo);
  console.log("selected", selected);
  console.log("search", search);
  return (
    <div className="App">
      <div className="main">
        <TodoBlock>
          <>
            <TodoCreator
              onClick={handleClick}
              onChange={handleChange}
              value={text}
            />

            <Select onChange={onSelect} />
            <Search onSearch={handleSearch} />

            {todo.length === 0 ? (
              <div>let's start</div>
            ) : (
              <div>
                {search.length && tempArr.length === 0 ? (
                  <div>No required todos</div>
                ) : null}
                {search.length
                  ? tempArr.map((el) => {
                      return (
                        <TodoItem
                          key={el.id}
                          todoText={el.todoText}
                          checked={el.checked}
                          onChecked={onChecked}
                          onDelete={onDelete}
                          id={el.id}
                        />
                      );
                    })
                  : (search.length === 0 && todo.length && id === 1) ||
                    id === 2 ||
                    id === 3
                  ? selected.map((el) => {
                      return (
                        <TodoItem
                          key={el.id}
                          todoText={el.todoText}
                          checked={el.checked}
                          onChecked={onChecked}
                          onDelete={onDelete}
                          id={el.id}
                        />
                      );
                    })
                  : null}
              </div>
            )}
          </>
        </TodoBlock>
        <RecycleBin openBin={openBin} />

        {delItems.length === 0
          ? isOpen && <Modal openBin={openBin} />
          : isOpen && (
              <Modal openBin={openBin}>
                {" "}
                {delItems.map((el) => {
                  return (
                    <DelItem
                      key={el.id}
                      todoText={el.todoText}
                      onRemove={outBin}
                      onReestab={onReestab}
                      id={el.id}
                    />
                  );
                })}
              </Modal>
            )}
      </div>
    </div>
  );
}

export default App;
