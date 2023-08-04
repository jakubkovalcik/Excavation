import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [currentTab, setCurrentTab] = useState("employees");
  const [employeeList, setEmployeeList] = useState([]);
  const [taskData, setTaskData] = useState({ meters: 0, timeLimit: 0 });

  const switchToEmployeesTab = () => {
    setCurrentTab("employees");
  };

  const switchToTaskTab = () => {
    setCurrentTab("task");
  };

  const addEmployee = (name, surname, gender) => {
    const newEmployeeList = [...employeeList];
    newEmployeeList.push({ name, surname, gender });
    setEmployeeList(newEmployeeList);
  };

  const removeEmployee = (index) => {
    const updatedEmployeeList = employeeList.filter((_, i) => i !== index);
    setEmployeeList(updatedEmployeeList);
  };

  const calculateTotalMeters = () => {
    let totalMeters = 0;
    for (let i = 0; i < employeeList.length; i++) {
      if (employeeList[i].gender === "male") {
        totalMeters += 1;
      } else if (employeeList[i].gender === "female") {
        totalMeters += 0.5;
      }
    }
    return totalMeters;
  };

  const isTaskPossible = () => {
    const totalMeters = calculateTotalMeters();
    if (totalMeters * taskData.timeLimit >= taskData.meters) {
      return true;
    } else {
      return false;
    }
  };

  const handleEmployeeTab = () => {
    if (currentTab === "employees") {
      return (
        <div>
          <h2>Employees</h2>
          <ul>
            {employeeList.map((employee, index) => (
              <li key={index}>
                {employee.name} {employee.surname} ({employee.gender})
                <button onClick={() => removeEmployee(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <form onSubmit={addEmployeeData}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="text" name="surname" placeholder="Surname" required />
            <select name="gender" required>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button class="black-btn" type="submit">Add Employee</button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  };

  const handleTaskTab = () => {
    if (currentTab === "task") {
      return (
        <div>

          <h2>Excavation Works</h2>
          <form class="form-container">
            <label>
              Required Meters: 
              <input
                type="number"
                name="meters"
                value={taskData.meters}
                onChange={(e) =>
                  setTaskData({ ...taskData, meters: parseFloat(e.target.value) })
                }
                required
              />
            </label>
            <label>
              Time Limit (hours):
              <input
                type="number"
                name="timeLimit"
                value={taskData.timeLimit}
                onChange={(e) =>
                  setTaskData({ ...taskData, timeLimit: parseFloat(e.target.value) })
                }
                required
              />
            </label>
            <button
              type="button"
              onClick={handleTaskCalculation}
              style={{
                backgroundColor: isTaskPossible() ? "green" : "red"
              }}
            >
              Planning Excavation
            </button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  };

  const addEmployeeData = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const gender = e.target.gender.value;
    addEmployee(name, surname, gender);
    e.target.reset();
  };

  const handleTaskCalculation = () => {
    if (isTaskPossible()) {
      alert("It can be done.");
    } else {
      alert("Cannot be done.");
    }
  };

  return (
    <div className="App">
      <div className="tabs">
        <button
          className={currentTab === "employees" ? "active" : ""}
          onClick={switchToEmployeesTab}
        >
          List of Employees
        </button>
        <button
          className={currentTab === "task" ? "active" : ""}
          onClick={switchToTaskTab}
        >
          Task
        </button>
      </div>
      <div className="tab-content">
        {handleEmployeeTab()}
        {handleTaskTab()}
      </div>
    </div>
  );
};

export default App;
