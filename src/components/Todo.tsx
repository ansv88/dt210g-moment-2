import styles from "./Todo.module.css";

const Todo = ({ todo, onTodoUpdate }: { todo: any, onTodoUpdate: Function }) => {

    const statusColor = todo.status === "Ej påbörjad" ? "red" : todo.status === "Påbörjad" ? "orange" : "green"

    const updateTodo = async (e: any) => {
        let newStatus = e.target.value;

        const newTodo = { ...todo, status: newStatus };

        try {
            const res = await fetch("https://dt210g-moment2-api.onrender.com/dt210g-todolist/todolist/" + todo._id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newTodo)
            });

            if (!res.ok) {
                throw Error("Kunde inte uppdatera todo.");
            }

            onTodoUpdate();

        } catch (error) {
            console.error("Fel vid uppdatering av todo:", error);
        }
    }

    const deleteTodo = async () => {
        try {
            const res = await fetch("https://dt210g-moment2-api.onrender.com/dt210g-todolist/todolist/" + todo._id, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Kunde inte radera todo.");
            }

            onTodoUpdate(); //Uppdatera listan
        } catch (error) {
            console.error("Fel vid radering av todo:", error);
        }
    };

    return (
        <section className={styles.todo}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p style={{ color: statusColor }}><strong>{todo.status}</strong></p>

            <form className={styles.statusContainer}>
                <label htmlFor="status">Ändra status</label>
                <select name="status" id="status" defaultValue={todo.status}
                    onChange={updateTodo}>
                    <option>Ej påbörjad</option>
                    <option>Påbörjad</option>
                    <option>Avklarad</option>
                </select>
            </form>
            <button className={styles.deleteBtn} onClick={deleteTodo}>
                Ta bort
            </button>
        </section>
    )
}

export default Todo