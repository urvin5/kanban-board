import "./App.css";
import Board from "react-trello";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function App() {
  const [columnsData, setColumnsData] = useState({
    lanes: [],
  });
  const [tasksDAta, setTasksData] = useState([]);

  function getTaskOfColumn(columnId) {
    const counts = tasksDAta.map((task) => {
      if (task.column_id === columnId) {
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
              cards: getTaskOfColumn(el.id),
            };
          }),
        });
      });
  }, [tasksDAta]);

  //To add columns
  const [formData, setFormData] = useState({
    id: uuidv4(),
    title: "",
    cards: [],
  });
  function addNewColumn() {
    setColumnsData({
      ...columnsData,
      lanes: [
        ...columnsData?.lanes,
        { id: formData.id, title: formData.title, cards: formData.cards },
      ],
    });
  }

  return (
    <div className="App">
      <Board data={columnsData} />
    </div>
  );
}

export default App;
