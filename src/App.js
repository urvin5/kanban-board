import "./App.css";
import Board from "react-trello";
import { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [columnsData, setColumnsData] = useState({
    lanes: [],
  });
  const [tasksDAta, setTasksData] = useState([]);

  function getCount(clgname) {
    const counts = tasksDAta.map((task) => {
      if (task.column_id === clgname) {
        return { ...task, title: task.name };
      }
    });

    return counts.filter((el) => el);
  }
  useEffect(() => {
    axios
      .get("http://demo.ciaoworks.com/practical/kanban/?getData=tasks")
      .then((res) => {
        const data = res.data;
        setTasksData(data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://demo.ciaoworks.com/practical/kanban/?getData=columns")
      .then((res) => {
        const data = res.data;
        setColumnsData({
          lanes: data.map((el, index) => {
            return {
              id: index,
              title: el.name || "New column",
              cards: getCount(el.id),
            };
          }),
        });
      });
  }, [tasksDAta]);

  function addNewColumn() {
    setColumnsData({
      ...columnsData,
      lanes: [...columnsData?.lanes, { id: "abc", title: "Urvin", cards: [] }],
    });
  }

  return (
    <div className="App">
      <Board data={columnsData} />
    </div>
  );
}

export default App;
