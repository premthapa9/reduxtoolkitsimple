import React from "react";
import Tasklist from "./components/Tasklist";
import Addtask from "./components/Addtask";

const App = () => {
  return (
    <div className="bg-[#a0c4e9] py-5">
      <h1 className="text-center font-bold text-3xl text-white">
        Simple Task Management App using ReduxJS toolkit
      </h1>
      <Addtask />
      <Tasklist />
    </div>
  );
};

export default App;
