import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

 return (
   <div>
    <h1>My Items App</h1>

    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter item name"
    />
 

    <form onSubmit={addItem}>
      <input
        type="text"
        placeholder="Enter item"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">
        Add Item
      </button>
    </form>

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}

          <button
            onClick={() => deleteItem(item.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

}

export default App;

const [name, setName] = useState("");


const addItem = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:8000/items", {
      name: name,
    });

    setName("");
    fetchItems(); // refresh table
  } catch (error) {
    console.error("Error adding item:", error);
  }
};    
// User submits form.
// React sends item to FastAPI.
// FastAPI saves it to database.
// Input box clears.
// React reloads all items

<form onSubmit={addItem}>
  <input
    type="text"
    placeholder="Enter item name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <button type="submit">Add Item</button>
</form>

const fetchItems = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/items"
    );

    setItems(response.data);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(
      `http://localhost:8000/items/${id}`
    );

    fetchItems();

  } catch (error) {
    console.error("Error deleting item:", error);
  }
};