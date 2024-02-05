import React, { useState, useEffect } from "react";
import { format, startOfWeek, endOfWeek, parseISO } from "date-fns";
import axios from "axios";

import Today from "./Today";
import ThisWeek from "./ThisWeek";
import AddModal from "../Modals/AddModal";
import UpdateModal from "../Modals/UpdateModal";
import DeleteModal from "../Modals/DeleteModal";
import Eventually from "./Eventually";
import { useUser } from "../contexts/UserContext";

const CurrentTasks = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const today = new Date();
  const options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = today.toLocaleDateString(undefined, options);
  // console.log(new Date().getDay());

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [initialTaskData, setInitialTaskData] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tasksForToday, setTasksForToday] = useState("");
  const [tasksForLater, setTasksForLater] = useState("");
  const [tasksForThisWeek, setTasksForThisWeek] = useState("");

  const [dueDate, setDueDate] = useState(null);

  const { currentUser } = useUser();

  const openEditModal = (taskData) => {
    setInitialTaskData(taskData);
    setIsUpdateModalOpen(true);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openDeleteModal = (task) => {
    setIsDeleteModalOpen(true);
    setTaskToDelete(task);
  };

  // console.log(tasks);

  useEffect(() => {
    // Fetch tasks from MongoDB using Axios
    fetchTasks();
  }, []);

  useEffect(() => {
    categorizeTasks();
  }, [tasks]);


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

  const handleDelete = async (task) => {
    // console.log(task.task);
    try {
      const response = await axios.delete(`${baseURL}/deleteToDo/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleUpdateDone = async (taskId, task) => {
    // console.log(task)
    const data = await fetchTaskOne(taskId);
    // console.log(data.task);
    try {
      const response = await axios.post(`${baseURL}/updateTodo`, {
        taskId: taskId,
        task: task,
        done: !data.task.done,
      });
      console.log("Update successful:", response.data);
      fetchTasks();
    } catch (error) {
      console.error("Error updating todo:", error);
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

  // console.log(tasks);
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

  const handleAddTodo = async (taskData, taskId) => {
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
        // console.log(error.response.data.error);
      }
    }
  };

  const filteredTasks = tasks && tasks.filter((task) =>
    task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // console.log(tasks);
  const categorizeTasks = () => {
    // console.log(tasks);
    const tasksToday = [];
    const tasksThisWeek = [];
    const tasksLater = [];

    tasks &&
      tasks.forEach((task) => {
        const currentWeekStartDate = startOfWeek(new Date(), {
          weekStartsOn: 1,
        });
        const currentWeekEndDate = endOfWeek(new Date(), {
          weekStartsOn: 1,
        });
        const taskDueDate = parseISO(task.dueDate);
        // console.log(taskDueDate)

        // Check if the task's dueDate is within the current week
        const isDueInCurrentWeek =
          taskDueDate > new Date() && taskDueDate <= currentWeekEndDate;

        const isDueToday =
          format(new Date(), "yyyy-MM-dd") ===
          format(task.dueDate, "yyyy-MM-dd");

        const isDueLater = taskDueDate > currentWeekEndDate;

        if (isDueToday) {
          tasksToday.push(task);
        } else if (isDueInCurrentWeek) {
          tasksThisWeek.push(task);
        } else if (isDueLater) {
          tasksLater.push(task);
        }
      });
    setTasksForToday(tasksToday);
    setTasksForThisWeek(tasksThisWeek);
    setTasksForLater(tasksLater);
    // console.log(tasks)
  };

  // console.log(tasks);
  return (
    <>
      <div className="flex justify-center w-full bg-slate-900">
        <div className="w-5/6 items-center p-2 flex flex-col gap-10 ">
          <div className="flex justify-between items-center w-full flex-col sm:flex-row gap-4 sm:gap-2">
            <div className="text-white font-bold sm:text-4xl text-lg">
              {formattedDate}
            </div>
            <div className="flex justify-between gap-4 sm:gap-8 flex-col sm:flex-row">
              <div className="flex items-center gap-4">
                <div className="border-2 border-white rounded-xl">
                  <input
                    type="text"
                    placeholder="Search todos"
                    className="bg-transparent outline-none py-2 px-4 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  className="text-white"
                  onClick={() => {
                    setSearchQuery("");
                  }}
                >
                  &#10005;
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-teal-600 text-white py-2 px-4 rounded-xl hover:bg-teal-700"
                  onClick={() => openAddModal()}
                >
                  Add Todo
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col md:flex-row gap-8 w-full ">
            <div className="bg-slate-700 sm:w-1/3 rounded-xl flex-1 min-h-[28rem]">
              <Today
                openAddModal={openAddModal}
                tasks={tasks}
                tasksForToday={tasksForToday}
                searchQuery={searchQuery}
                openDeleteModal={openDeleteModal}
                openEditModal={openEditModal}
                handleUpdateDone={handleUpdateDone}
                filteredTasks={filteredTasks}
              />
            </div>
            <div className="bg-slate-700 sm:w-1/3 rounded-xl flex-1 min-h-[28rem]">
              <ThisWeek
                openAddModal={openAddModal}
                tasks={tasks}
                tasksForThisWeek={tasksForThisWeek}
                searchQuery={searchQuery}
                openDeleteModal={openDeleteModal}
                openEditModal={openEditModal}
                handleUpdateDone={handleUpdateDone}
                filteredTasks={filteredTasks}
              />
            </div>
            <div className="bg-slate-700 sm:w-1/3 rounded-xl flex-1 min-h-[28rem]">
              <Eventually
                openAddModal={openAddModal}
                tasks={tasks}
                tasksForLater={tasksForLater}
                searchQuery={searchQuery}
                openDeleteModal={openDeleteModal}
                openEditModal={openEditModal}
                handleUpdateDone={handleUpdateDone}
                filteredTasks={filteredTasks}
              />
            </div>
          </div>
        </div>
      </div>
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        handleSubmit={handleAddTodo}
      />
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

export default CurrentTasks;
