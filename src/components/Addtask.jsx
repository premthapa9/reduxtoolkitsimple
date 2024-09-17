import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import { addTask, updateTask } from "../features/taskSlice";
const Addtask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const {
    task,
    loading,
    error,

    edit,
    editID,
  } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const handleForm = (e) => {
    e.preventDefault();
    console.log("god love us all");
    const newTask = {
      id: uuid4(),
      title,
      description,
      status,
    };
    if (!edit) {
      dispatch(addTask(newTask));
      setTitle("");
      setDescription("");
      setStatus("To Do");
    } else {
      dispatch(updateTask({ editID, title, description, status }));
      setTitle("");
      setDescription("");
      setStatus("To Do");
    }
  };

  useEffect(() => {
    if (edit) {
      let mytask = task.find((item) => item.id === editID);
      setStatus(mytask.status);
      setTitle(mytask.title);
      setDescription(mytask.description);
    }
  }, [edit, editID]);
  return (
    <div className="px-2 lg:px-10">
      <form onSubmit={handleForm} className="flex flex-col gap-3">
        <h1 className="text-center text-white underline underline-offset-8 text-2xl my-4">
          Add new Task
        </h1>
        <input
          type="text"
          className="p-1 rounded-lg outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Name"
          required
        />
        <textarea
          className="p-1 rounded-lg outline-none"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ resize: "none" }}
        ></textarea>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-1 rounded-lg"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          type="submit"
          className="p-1 outline-none text-white text-2xl rounded-lg bg-[#dc2818]"
        >
          {edit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default Addtask;
