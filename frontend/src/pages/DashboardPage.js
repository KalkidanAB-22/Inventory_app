import { useState, useEffect } from "react";
import axios from "axios";

function DashboardPage() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  
  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/items",
        authHeader
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/items",
        { name: name },
        authHeader
      );

      setName("");
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/items/${id}`,
        authHeader
      );

      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={addItem}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item"
        />
        <button>Add</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;