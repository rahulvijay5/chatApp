import { React, useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateModal = ({ isOpen, onClose, handleSubmit, initialTaskData }) => {
  const [inputTask, setInputTask] = useState("");
  const [inputDueDate, setInputDueDate] = useState("");
  const [done, setDone] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const { currentUser } = useUser();

  const handleChangeTask = (e) => {
    const { name, value } = e.target;
    setInputTask(value);
  };

  const handleChangeDate = (e) => {
    const { name, value } = e.target;
    setInputDueDate(value);
  };

  const inputData = {
    task: inputTask,
    done: done,
    dueDate: inputDueDate,
    userId: currentUser.userId,
  };
  useEffect(() => {
    if (initialTaskData) {
      setInputTask(initialTaskData.task || "");
      setInputDueDate(initialTaskData.dueDate || "");
    }
  }, [initialTaskData]);

  const handleCombinedClick = (e) => {
    console.log(inputTask.length === 0 || dueDate === "");
    handleSubmit(inputData, initialTaskData._id);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Foggy background */}
          <div className="fixed inset-0 bg-gray-800 opacity-60"></div>

          {/* Modal content */}
          <div className="bg-slate-900 p-8 rounded-xl text-lg font-semibold z-10 text-white sm:w-1/3 h-[47%] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p>What do you want to do?</p>
              <div className="border-2 rounded-xl">
                <textarea
                  type="text"
                  className="h-[5rem] px-2 py-2 bg-transparent w-full outline-none overflow-y-hidden text-base"
                  name="task"
                  value={inputTask}
                  onChange={handleChangeTask}
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>When do you want to do this?</p>
              <DatePicker
                onChange={(date) => setInputDueDate(date)}
                className="bg-transparent sm:w-[54%] border-2 rounded-xl outline-none px-2 py-1"
                selected={inputDueDate}
              />
            </div>
            <div className="flex gap-2">
              <div>
                <button
                  className={`mt-4 p-2 text-white rounded-md bg-teal-600 ${
                    inputTask.length === 0 || inputDueDate === ""
                      ? "opacity-50"
                      : ""
                  }`}
                  onClick={handleCombinedClick}
                  disabled={inputTask.length === 0 || inputDueDate === ""}
                >
                  Update Todo
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

export default UpdateModal;
