import { useState } from 'react';
import styles from "./AddTodo.module.css";

const AddTodo = ({ onTodoUpdate }: { onTodoUpdate: Function }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Ej påbörjad");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //Trimma input på tomma tecken
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        //Validering
        if (trimmedTitle.length < 3) {
            setError("Titeln måste vara minst 3 tecken lång.");
            return;
        }

        if (trimmedDescription.length > 200) {
            setError("Beskrivningen får vara max 200 tecken.");
            return;
        }

        //Skapa nytt todo-objekt
        const newTodo = { title: trimmedTitle, description: trimmedDescription, status };

        try {
            const res = await fetch("http://localhost:3000/dt210g-todolist/todolist", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newTodo),
            });

            if (!res.ok) {
                throw new Error("Det gick inte att skapa todo.");
            }

            //Rensa formuläret och felmeddelanden
            setTitle("");
            setDescription("");
            setStatus("Ej påbörjad");
            setError(null);

            //Uppdatera listan
            onTodoUpdate();
        } catch (error) {
            setError("Det blev ett fel vid skapandet av todo.");
        }
    };

    return (
        <section className={styles.addtodoSection}>
            <h2>Lägg till ny Todo</h2>
            
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form className={styles.addtodoForm} onSubmit={handleSubmit}>
                <label>Rubrik:</label>
                <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setError(null); }} required />

                <label>Beskrivning:</label>
                <textarea value={description} onChange={(e) => { setDescription(e.target.value); setError(null); }} />

                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Ej påbörjad</option>
                    <option>Påbörjad</option>
                    <option>Avklarad</option>
                </select>

                <button className={styles.addBtn} type="submit">Lägg till</button>
            </form>
            <hr className={styles.divider} />
        </section>
    );
};

export default AddTodo;