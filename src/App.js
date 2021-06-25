import { useState, useEffect } from 'react';
import ToDo from './components/ToDo';
import ToDoForm from './components/ToDoForm';

function App() {

    const [todos, setTodos] = useState( []);

    useEffect(() => {
        const todoLists = JSON.parse(localStorage.getItem("item"));
        if (todoLists){
            setTodos(todoLists);
        }
    }, []);

    useEffect( () => {
        localStorage.setItem("item", JSON.stringify(todos));
    },[todos])

    const addTask = (userInput) => {
        if(userInput) {
            const newItem = {
                id: Math.random(),
                task: userInput,
                complete: false
            }
            setTodos([...todos, newItem])
        }
    }

    const removeTask = (id) => {
        setTodos([...todos.filter((todo) => todo.id !== id)])
    }

    const handleToggle = (id) => {
        setTodos([
            ...todos.map((todo) =>
                todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
            )
        ]);
    }

    return (
        <div className="App">
            <header>
                <div className="title">All To Do Lists: {todos.length}</div>
            </header>
            <ToDoForm addTask={addTask} />

            {
                todos.length === 0
                    ? (<div > IS EMPTY </div>)
                    : todos.map((todo) => (
                        <ToDo
                            todo={todo}
                            key={todo.id}
                            toggleTask={handleToggle}
                            removeTask={removeTask}
                        />
                    ))
            }
        </div>
    );
}

export default App;