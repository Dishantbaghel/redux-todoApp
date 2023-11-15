import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const TodosList = ({
  editTodo,
  filteredTodos,
  handleComplete,
  handleDelete,
  handleEdit,
  handleSave,
  editedText,
  setEditedText,
  setErrorMessage
}) => {
  return (
    <div>
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
                { editTodo === todo.id ? (
                  <input
                    type="text"
                    className="todos-input-field"
                    value={editedText}
                    onChange={(e)=>{
                        setEditedText(e.target.value);
                        setErrorMessage("");
                    }}
                  />
                ) : (
                   todo.title
                )}
              </div>
              {todo.completed == true &&
                <div className="done-msg">Done</div>
             }
            </div>
            {editTodo === todo.id ? (
              <button className="btn" onClick={handleSave}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            ) : (
              <>
                <button className="btn" onClick={() => handleEdit(todo.id)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                
              </>
            )}<button className="btn" onClick={() => handleDelete(todo)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
          </li>
        </div>
      ))}
    </div>
  );
};

export default TodosList;
