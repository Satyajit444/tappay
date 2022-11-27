import React, { useEffect, useState } from "react";

// to get the data from localstorage

const getLocalItems = () => {
  let List = localStorage.getItem("Lists");

  if (List) {
    return JSON.parse(localStorage.getItem("Lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("no todo added");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elm) => {
          if (elm.id === isEditItem) {
            return { ...elm, name: inputData };
          }
          return elm;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  //   deleting items from array

  const deleteItem = (index) => {
    const updatemItems = items.filter((elm) => {
      return index !== elm.id;
    });
    setItems(updatemItems);
  };

  //   editing items from array

  const editItem = (id) => {
    let newEditItem = items.find((elm) => {
      return elm.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };
  //   remove all the items

  const removeAll = () => {
    setItems([]);
  };

  // add data to localstorage

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <h2>Todo List</h2>

        <div className="addItems">
          <input
            type="text"
            placeholder=" Enter your task"
            onChange={(e) => setInputData(e.target.value)}
            value={inputData}
          />
          {toggleSubmit ? (
            <button onClick={addItem}>Add</button>
          ) : (
            <button onClick={addItem}>Save</button>
          )}
        </div>

        <div className="showItems">
          {items.map((elm) => {
            return (
              <div className="eachItem" key={elm.id}>
                <h3>{elm.name}</h3>
                <button onClick={() => editItem(elm.id)}>Edit</button>
                <button onClick={() => deleteItem(elm.id)}>Delete</button>
              </div>
            );
          })}
        </div>

        <div className="cleatbutton">
          <button
            onClick={removeAll}
            id="removeAll"
            // style={{ display: setItems([""] )? "none" : "block" }}
          >
            Remove All
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
