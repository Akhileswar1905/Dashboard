import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Item from "./Item";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [newTask, setNewTask] = useState({
    id: uuid(),
    name: "",
    body: "",
    status: "",
  });

  const state = localStorage.getItem("id");

  const handleAddTask = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/addtodo/${state}`,
        newTask
      );
      // console.log(res.data);
      setTasks([...tasks, res.data]);
      setModal(false);
      setNewTask({
        id: uuid(),
        name: "",
        body: "",
        status: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${state}`);
        // console.log(res.data);
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [state]);

  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="main">
        <header className={styles.header}>
          <p className={styles.heading}>
            <b>Ahoy, </b>Mate!!
          </p>
          <button
            style={{
              backgroundColor: "red",
              padding: "10px",
              borderRadius: 10,
              color: "white",
              width: "10%",
              cursor: "pointer",
            }}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </header>
        <div className={styles.taskContainer}>
          <div className={styles.list}>
            <div className={styles.listHeader}>
              <p>To Do</p>
              <p
                style={{ fontSize: "33px", cursor: "pointer" }}
                onClick={() => {
                  setModal(true);
                  setNewTask({
                    ...newTask,
                    status: "Not Started",
                  });
                }}
              >
                +
              </p>
            </div>
            <div className="ItemContainer">
              <Item
                data={tasks.filter((task) => task.status === "Not Started")}
              ></Item>
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.listHeader}>
              <p>In Progress</p>
              <p
                style={{ fontSize: "33px", cursor: "pointer" }}
                onClick={() => {
                  setModal(true);
                  setNewTask({
                    ...newTask,
                    status: "In Progress",
                  });
                }}
              >
                +
              </p>
            </div>
            <div className="ItemContainer">
              <Item
                data={tasks.filter((task) => task.status === "In Progress")}
              ></Item>
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.listHeader}>
              <p>Done</p>
              <p
                style={{ fontSize: "33px", cursor: "pointer" }}
                onClick={() => {
                  setModal(true);
                  setNewTask({
                    ...newTask,
                    status: "Done",
                  });
                }}
              >
                +
              </p>
            </div>
            <div className="ItemContainer">
              <Item
                data={tasks.filter((task) => task.status === "Done")}
              ></Item>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setModal(false)}>
              &times;
            </span>
            <input
              type="text"
              placeholder="Name"
              value={newTask.name}
              onChange={(e) => {
                setNewTask({ ...newTask, name: e.target.value });
                // console.log(newTask);
              }}
            />
            <textarea
              placeholder="Body"
              value={newTask.body}
              onChange={(e) => {
                setNewTask({ ...newTask, body: e.target.value });
                // console.log(newTask);
              }}
            ></textarea>
            <button onClick={handleAddTask} className="add">
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
