import { ADD, complete, deleteAll, deleteSingle, initialTodos, saveEdit } from "../actions";

// const initialState =[];

const initialState = {
  todos: [],
};

export const operationsReducer =(state = initialState, action)=>{
    switch(action.type){
        case initialTodos:
            return {
            ...state,
            todos :action.payload
        }

        case ADD:
            // console.log(action.payload);
            return { ...state, todos: [...state.todos, action.payload] };

        case deleteAll: 
            return { ...state, todos: [] };

        case deleteSingle:
            // console.log(action.payload.id)
            return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload.id) };

        case saveEdit:
            const{id,text} = action.payload;
            // console.log(action.payload)
            return { ...state, todos: state.todos.map((item) => (item.id === id ? { ...item, title: text } : item)) };

        case complete:
            return { ...state, todos: state.todos.map((item) => (item.id === action.payload ? { ...item, completed: !item.completed } : item)) };

        default:
            return state;
    }
}