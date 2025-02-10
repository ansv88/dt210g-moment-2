import Header from "./components/Header";
import Todo from "./components/Todo";
import useGet from "./hooks/useGet";
import AddTodo from "./components/AddTodo";
import Footer from "./components/Footer";

interface TodoInterface {
  _id: string,
  title: string,
  description: string,
  status: string
}

function App() {

  //States för komponenten
  const { data : todos, error, loading, fetchData } = useGet<TodoInterface[]>("http://localhost:3000/dt210g-todolist/todolist");

  return (
    <>
    <Header />

      <main className="main">
        <h1 className="h1Main">Att göra lista:</h1>

        <AddTodo onTodoUpdate={fetchData} />

        {loading && <p>Laddar...</p>}
        {error && <p>{error}</p>}

        <div className="todosContainer">
        {todos.length === 0 && <p className="infoText">Inga todos ännu. Lägg till en ny!</p>}
          {
            todos.map((todo) => (
              <Todo todo={todo} key={todo._id} onTodoUpdate={fetchData} />
            ))
          }
        </div>

      </main>

      <Footer />
    </>
  )
}

export default App