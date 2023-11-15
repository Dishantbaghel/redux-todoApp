import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { data } from "../staticData/button";
import {useDispatch, useSelector} from 'react-redux'
import { addTodo, completeTodo, deleteAllTodo, handleDelete, handleSaveEdit, setInitialTodos } from "../redux/actions";

const getLocalItems =()=>{
    let list = localStorage.getItem('lists')
    if(list){
      return JSON.parse(localStorage.getItem('lists'))
    }
    else{
      return []
    }
  }

const Home = () => {
  const [input, setInput] = useState(""); // this is for input
  const [editTodoId, setEditTodoId] = useState(null); // editTodoId = this contain edited text and replace with new one.
  const [errorMessage, setErrorMessage] = useState(""); // this is for display error
  const [prevText, setPrevText] = useState("");
  const [filter, setFilter] = useState("All"); // this is for filter the todos
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [activeButton, setActiveButton] = useState("All");

  const todos = useSelector((state)=>state.operationsReducer.todos)
  const dispatch = useDispatch();

  useEffect(() => {
    const localTodos = getLocalItems();
    dispatch(setInitialTodos(localTodos));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const filterTodos = () => {
      if (filter === "All") {
        return todos;
      } else if (filter === "Completed") {
        return todos.filter((todo) => todo.completed);
      } else if (filter === "Incomplete") {
        return todos.filter((todo) => !todo.completed);
      }
    };
    setFilteredTodos(filterTodos());
  }, [filter, todos]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!editTodoId && trimmedInput !== "") {

      let todoObj ={
        id: uuidv4(),
        title: trimmedInput,
        completed: false
      }
      setInput("");
      dispatch(addTodo(todoObj))
    } else {
      setErrorMessage("plz enter data");
    }
  };

  const handleFilter = ( name) => {
    setFilter(name);
  };

  const handleComplete = (id) => {
  dispatch(completeTodo(id));
  };

  const handleEditInput = (task) => {
    setEditTodoId(task.id);  // this is for set the input field 
    // console.log(editTodoId);
    const text = todos.find((item) => item.id === task.id);
    // console.log("text:"+text.title);
    setPrevText(text.title);
  };

  const handleSave = () => {
    if (prevText.trim() !== "") {
      dispatch(handleSaveEdit(editTodoId, prevText));
    } 
    else {
      setErrorMessage("Todo cannot be empty");
    }
    setEditTodoId(null);
  };


  return (
      <div className='parent'>
      <div className='child'>
        <h1 className='main-heading'>TODO APP</h1>
        <div className='container'>

        <form onSubmit={onFormSubmit}>
        <input
          type="text"
          className="form-input-field"
          placeholder="Enter todo here..."
          required
          value={input}
          onChange={(e)=>{
            setInput(e.target.value)
            setErrorMessage("")}}
        />
        <button className="btn" type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

{/********************************status buttons**************************** */}

      {todos.length > 0 &&
      <div className="status">
        {data.map((ele) => {
          return (
            <button
              className={`status-btn ${activeButton === ele.name ? "active" : ""}`}
              onClick={() => {
                handleFilter( ele.name)
                setActiveButton(ele.name)}}
                key={ele.id}
              >
              {ele.name}
            </button>
          );
        })}
      </div>}

{/********************************Todos**************************** */}
      <div>
      <ul>
      {filteredTodos.map((todo) => (
        <div className="display-todos" key={todo.id}>
          <li className="list">
            <div className="single-todo">
              <div className="checkbox-text">

                <input
                  className="check-box"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleComplete(todo.id)}
                />

                { editTodoId === todo.id ? (
                  <form className='form-todo' onSubmit={handleSave}>
                  <input
                    type="text"
                    className="todos-input-field"
                    value={prevText}
                    onBlur={handleSave}
                    onChange={(e)=>{
                        setPrevText(e.target.value);
                        setErrorMessage("");
                    }}
                  /></form>
                ) : (
                   todo.title
                )}


              </div>
              {todo.completed == true && <div className="done-msg">Done</div>}
            </div>
            {editTodoId === todo.id ? (
              <button className="btn" onClick={handleSave}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            ) : (
                <button className="btn" onClick={() => handleEditInput(todo)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            )}
                <button className="btn" onClick={() => dispatch(handleDelete(todo))}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
          </li>
        </div>
      ))}
      </ul>
    </div>
    
        {todos.length > 0 &&
        <button className="clearAll-btn" onClick={()=>dispatch(deleteAllTodo())}>Clear all</button>
        }
          </div>
      </div>
    </div>
  );
};

export default Home;
