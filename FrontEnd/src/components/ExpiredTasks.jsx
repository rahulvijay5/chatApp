import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, startOfWeek, endOfWeek, parseISO } from "date-fns";
import { Delete, Edit, Add } from "./Icons";
import UpdateModal from "../Modals/UpdateModal";
import DeleteModal from "../Modals/DeleteModal";
import { useUser } from "../contexts/UserContext";

const ExpiredTasks = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [initialTaskData, setInitialTaskData] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState("");
  const [expiredTasks, setExpiredTasks] = useState("");

  const { currentUser } = useUser();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const openEditModal = (taskData) => {
    setInitialTaskData(taskData);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (task) => {
    setIsDeleteModalOpen(true);
    setTaskToDelete(task);
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/getToDo?userId=${currentUser.userId}`
      );
      setTasks(response.data.Tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    categorizeTasks();
  }, [tasks]);

  const handleDelete = async (task) => {
    // console.log(task.task);
    try {
      const response = await axios.delete(`${baseURL}/deleteToDo/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleUpdateTask = async (taskId, task) => {
    console.log(task);
    const data = await fetchTaskOne(taskId);
    console.log(task);
    try {
      const response = await axios.post(`${baseURL}/updateTodo`, {
        taskId: taskId,
        task: task.task,
        done: data.task.done,
        dueDate: task.dueDate,
      });
      console.log("Update successful:", response.data);
      fetchTasks();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const fetchTaskOne = async (taskId) => {
    if (!currentUser) {
      console.log("No user logged in");
      return;
    }

    const userId = currentUser.userId;

    try {
      const response = await axios.get(
        `${baseURL}/getTask/${taskId}?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleAddTodo = async (taskData, taskId) => {
    // console.log(taskData)
    if (taskId) {
      handleUpdateTask(taskId, taskData);
    } else {
      // console.log(taskData);
      try {
        await axios.post(`${baseURL}/newToDo`, taskData);
        // Fetch tasks again after adding a new todo
        fetchTasks();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const categorizeTasks = () => {
    // console.log(tasks);
    const tasksExpired = [];

    tasks &&
      tasks.forEach((task) => {
        var taskDueDate = parseISO(task.dueDate);
        taskDueDate = format(taskDueDate, "yyyy-MM-dd");
        const today = format(new Date(), "yyyy-MM-dd");
        const isExpired = taskDueDate < today;

        if (isExpired) {
          tasksExpired.push(task);
        }
      });
    setExpiredTasks(tasksExpired);
    // console.log(tasks)
  };

  const today = new Date();
  const options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col sm:w-[30%] gap-6">
          <div className="text-white font-bold sm:text-4xl text-lg">
            {formattedDate}
          </div>

          <div className="bg-slate-700 w-full rounded-xl p-4 min-h-[28rem]">
            <div className="text-white font-bold text-lg">Expired Tasks</div>
            <div>
              {expiredTasks.length === 0 ? (
                <div className="text-center flex flex-col mt-16 gap-2">
                  <p className="text-gray-500">
                    Keep it up! All tasks completed on time!
                  </p>
                </div>
              ) : (
                <ul className="text-white  w-full flex flex-col gap-2 py-4">
                  {expiredTasks &&
                    expiredTasks.map((task, index) => {
                      return (
                        <li
                          key={index}
                          className={`p-3 flex justify-between gap-2 bg-slate-900 rounded-lg group`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="">{task.task}</div>
                          </div>
                          <div className="hidden group-hover:flex ">
                            <div className="font-bold ">
                              <div className="flex gap-2">
                                <div>
                                  <button onClick={() => openDeleteModal(task)}>
                                    <Delete />
                                  </button>
                                </div>
                                <div>
                                  <button onClick={() => openEditModal(task)}>
                                    <Edit />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        handleSubmit={handleAddTodo}
        initialTaskData={initialTaskData}
      />
      {taskToDelete && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          handleDelete={() => handleDelete(taskToDelete)}
        />
      )}
    </>
  );
};

export default ExpiredTasks;
