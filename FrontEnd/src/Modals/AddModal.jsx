import { React, useState, useRef } from "react";
import { useUser } from "../contexts/UserContext";
// import { Calender } from "../components/Icons";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const AddModal = ({ isOpen, onClose, handleSubmit }) => {
  const date = new Date();
  const [inputTask, setInputTask] = useState("");
  const [done, setDone] = useState(false);
  const [dueDate, setDueDate] = useState(date);
  const [error, setError] = useState("");

  const { currentUser } = useUser();

  // console.log(typeof(currentUser.userId))

  const handleChangeTask = (e) => {
    const { name, value } = e.target;
    setInputTask(value);
  };

  const inputData = {
    task: inputTask,
    done: done,
    dueDate: dueDate,
    userId: currentUser.userId,
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3001/newToDo", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(inputData),
  //     });
  //     const data = await response.json();
  //     console.log("Task added successfully:", data);
  //   } catch (error) {
  //     console.error("Error adding todo:", error);
  //     // Handle error, display a message, etc.
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetchData();
  // };

  const handleCombinedClick = (e) => {
    handleSubmit(inputData);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Foggy background */}
          <div className="fixed inset-0 bg-gray-800 opacity-60"></div>

          {/* Modal content */}
          <div className="bg-slate-900 p-8 rounded-xl text-lg font-semibold shadow-md z-10 text-white sm:w-1/3 sm:h-[47%] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p>What do you want to do?</p>
              <div className="border-2 rounded-xl">
                <textarea
                  type="text"
                  className="h-[5rem] px-2 py-2 bg-transparent w-full outline-none overflow-y-hidden text-base"
                  name="task"
                  onChange={handleChangeTask}
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>When do you want to do this?</p>
              {/* <input
                  type="date"
                  className="bg-transparent w-full px-2 text-white outline-none text-sm"
                  name="date"
                  required
                  onChange={handleChangeDate}
                /> */}
              <DatePicker
                onChange={(date) => setDueDate(date)}
                className="bg-transparent sm:w-[54%] border-2 rounded-xl outline-none px-2 py-1"
                selected={dueDate}
              />
            </div>
            <div className="flex gap-2">
              <div>
                <button
                id="save"
                  className={`mt-4 p-2 text-white rounded-md bg-teal-600 ${
                    inputTask.length === 0 || dueDate === "" ? "opacity-50" : ""
                  }`}
                  onClick={handleCombinedClick}
                  disabled={inputTask.length === 0 || dueDate === ""}
                  // onClick={() => {
                  //   handleSubmit(),
                  //   onClose();
                  // }}
                >
                  Save Todo
                </button>
              </div>
              <div>
                <button
                  className="mt-4 p-2 bg-transparent text-white rounded-md"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
