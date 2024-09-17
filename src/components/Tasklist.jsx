import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask, fetchtodo } from "../features/taskSlice";

const Tasklist = () => {
  const { task, loading, error, status, edit, editID } = useSelector(
    (state) => state.task
  );
  console.log(task, loading, error, status, edit, editID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchtodo());
  }, [dispatch]);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>Something went wrong : {error}</p>;
  }
  return (
    <div className="px-2 md:px-4 lg:px-12 gap-3">
      {task?.length > 0 &&
        task?.map((item, ind) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-5 md:flex-row lg:flex-row justify-between items-center border p-2 my-4 border-gray-500 rounded-lg "
          >
            <div>
              <h1>Title: {item.title}</h1>

              <p>Description: {item.description}</p>
              <p>Status: {item.status}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(editTask(item.id))}
                className="px-3 py-[2px] border-none rounded-lg bg-green-500"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(item.id))}
                className="px-3 py-[2px] border-none bg-red-500 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tasklist;
