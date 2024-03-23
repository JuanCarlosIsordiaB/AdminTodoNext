"use client";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { createNewTodo, deleteCompletedTodos } from "../actions/todo-actions";

export const NewTodo = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const onChange = (e: FormEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setDescription(inputElement.value);
    setError(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) {
      setError(true);
      return;
    }
    setError(false);

    //todosApi.createTodo(description);
    await createNewTodo(description);
    setDescription("");
  };

  const deletedCompleted = async () => {
    await deleteCompletedTodos();
    
  };

  return (
    <form className="flex w-full" onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={description}
        type="text"
        className={`w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all ${
          error ? "border-red-500" : ""
        }`}
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={()=>deletedCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Delete Task Completed
      </button>
    </form>
  );
};
