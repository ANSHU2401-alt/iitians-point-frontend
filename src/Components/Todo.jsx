import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdEdit, MdDelete } from "react-icons/md";

const App = () => {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    settodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handlechange = (e) => {
    settodo(e.target.value);
  };

  const handleadd = () => {
    if (todo.trim() === "") return;

    if (editId) {
      settodos(
        todos.map((item) =>
          item.id === editId ? { ...item, todo: todo.trim() } : item
        )
      );

      setEditId(null);
      settodo("");
      return;
    }

    const found = todos.find(
      (item) =>
        item.todo.trim().toLowerCase() === todo.trim().toLowerCase()
    );

    if (found) {
      alert("Todo already exists");
      return;
    }

    settodos([
      ...todos,
      {
        id: uuidv4(),
        todo: todo.trim(),
        isCompleted: false,
      },
    ]);

    settodo("");
  };

  const handleDelete = (id) => {
    settodos(todos.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    settodo(item.todo);
    inputRef.current.focus();
  };

  const handleCheckbox = (id) => {
    settodos(
      todos.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const pending = todos.filter((t) => !t.isCompleted).length;
  const completed = todos.filter((t) => t.isCompleted).length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-zinc-950 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-violet-300 p-6">
            <h1 className="text-3xl font-bold mb-4">
              Todo Manager
            </h1>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                ref={inputRef}
                value={todo}
                onChange={handlechange}
                type="text"
                placeholder="Enter a todo..."
                className="
                flex-1
                px-4
                py-2
                rounded-xl
                border
                border-zinc-400
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-violet-600
                "
              />

              <button
                onClick={handleadd}
                className="
                bg-violet-700
                hover:bg-violet-800
                text-white
                px-6
                py-2
                rounded-xl
                font-semibold
                transition
                cursor-pointer
                "
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>

            <div className="flex gap-6 mt-4 font-semibold">
              <span>Pending: {pending}</span>
              <span>Completed: {completed}</span>
              <span>Total: {todos.length}</span>
            </div>
          </div>

          <div className="p-6 bg-zinc-100">
            <h2 className="text-2xl font-bold mb-4">
              Your Todos
            </h2>

            {todos.length === 0 && (
              <div className="text-gray-500">
                No Todos Available
              </div>
            )}

            <div className="flex flex-col gap-3">
              {todos.map((element) => (
                <div
                  key={element.id}
                  className="
                  flex
                  items-center
                  justify-between
                  bg-white
                  rounded-xl
                  shadow
                  p-3
                  "
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={element.isCompleted}
                      onChange={() =>
                        handleCheckbox(element.id)
                      }
                      className="w-4 h-4 cursor-pointer"
                    />

                    <div
                      className={`flex-1 break-words ${
                        element.isCompleted
                          ? "line-through text-gray-500"
                          : "text-black"
                      }`}
                    >
                      {element.todo}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-3">
                    <button
                      onClick={() => handleEdit(element)}
                      className="
                      bg-blue-500
                      hover:bg-blue-600
                      text-white
                      p-2
                      rounded-lg
                      transition
                      cursor-pointer
                      "
                    >
                      <MdEdit />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(element.id)
                      }
                      className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      p-2
                      rounded-lg
                      transition
                      cursor-pointer
                      "
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-200 p-6">
            <h2 className="text-2xl font-bold mb-4">
              Finished Items
            </h2>

            <div className="flex flex-col gap-2">
              {todos
                .filter((item) => item.isCompleted)
                .map((item) => (
                  <div
                    key={item.id}
                    className="
                    bg-white
                    rounded-lg
                    p-3
                    line-through
                    text-gray-600
                    "
                  >
                    {item.todo}
                  </div>
                ))}

              {completed === 0 && (
                <div className="text-gray-600">
                  No completed tasks yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;