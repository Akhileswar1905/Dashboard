import React from "react";
import styles from "./Dashboard.module.css";
import axios from "axios";

const Item = ({ data }) => {
  const token = localStorage.getItem("id");
  const handleDelete = async (task) => {
    console.log(task);
    const res = await axios.delete(
      `http://localhost:5000/deletetask/${token}`,
      { data: { id: task } }
    );
    console.log(res.data);
    window.location.reload();
  };

  const handleEdit = (id) => {};

  return (
    <div>
      {data?.map((item) => (
        <div className={styles.listItem} key={item.id}>
          <div className={styles.itemMain}>
            <p className={styles.itemName}>
              {item ? item.name : "Something 1"}
            </p>
            <p className={styles.itemBody}>
              {item ? item.body : "I have to do something"}
            </p>
            <div className={styles.btns}>
              <div className={styles.grp2}>
                <button
                  className={styles.button}
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item;
