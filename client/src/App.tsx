import { api } from './api'
import './App.css'

function App() {
  const getAllTodo = async () => {
    const res = await api.todo.$get();
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      <button onClick={getAllTodo}>get all todo</button>
    </>
  )
}

export default App
