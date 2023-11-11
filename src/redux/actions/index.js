export const ADD = 'add';
export const deleteAll = 'deleteAll';
export const deleteSingle = 'delete';
export const saveEdit = 'saveEdit';
export const complete = 'complete';
export const initialTodos = 'initialTodos';

export const setInitialTodos = (todos) => {
  return {
    type: initialTodos,
    payload: todos,
  };
};

export const addTodo =(payload)=>{
    // console.log(payload);
    return {
        type: ADD,
        payload
    }
}

export const deleteAllTodo =()=>{
    return {
        type:deleteAll
    }
}

export const handleDelete =(todo)=>{
    // console.log(id);
    return {
        type: deleteSingle,
        payload: todo
    }
}

export const handleSaveEdit = (id,text) =>{
    // console.log(todo)
    return{
        type: saveEdit,
        payload : {id,text},
    }
}

export const completeTodo = (id) =>{
    return{
        type : complete,
        payload : id
    }
}