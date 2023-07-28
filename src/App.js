// adding explanations along the code :) 

// imports which consist of the JSX (js + xml code)
import Header from './header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:4000/items'; 
  // generated via :  npx json-server --watch data/db.json --port 4000

  /* This command will start the JSON server and serve the data from the db.json file located in the data folder. The server will run on port 3500. Make sure that the json-server package is installed globally or use npx to run it directly without a global installation.*/

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /*useEffect is a hook in React that allows you to perform side effects in functional components. Side effects are actions that affect the outside world, such as fetching data from an API, updating the DOM, subscribing to events, or performing cleanup operations. 
  
  It runs after every render by default. If you want to control when the useEffect runs, you can pass an array of dependencies as the second argument. When any of the dependencies change, the useEffect will be called again. If the dependencies array is empty, the useEffect will only run once after the initial render.*/

  useEffect(() => {

    // to get the items from db.json 
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        // after fetching finishes:
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json(); // gets all the data back
        setItems(listItems);
        setFetchError(null);
        
      } catch (err) {
        setFetchError(err.message); // if there was any error
      } finally {
        setIsLoading(false); // loading is over
      }
    }

    setTimeout(() => fetchItems(), 2500); // to simulate time being taken to fetch

  }, [])

  // to add an item to the list:

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; 
    // to calculate the id value of the new item. if items.length > 0 then it sets it, as the last items id value + 1, else just 1 since it would be the first element.

    const myNewItem = { id, checked: false, item }; // new object 
    const listItems = [...items, myNewItem]; // adding new object to old Items list
    setItems(listItems);

    // The POST method is used when we add new items 
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);

    /* 
    JSON.stringify() is a built-in JavaScript function that converts a JavaScript object or value into a JSON string representation. It serializes the object, converting it into a string format that can be easily transmitted or stored.

    In the context of our code, JSON.stringify(myNewItem) is used to convert the myNewItem object into a JSON string before sending it in the request body during the API POST request. This is necessary because when making an HTTP request, the data is typically sent as a string, and JSON is a common format used for data interchange.*/

    /* in summary, the setItems and listItems are used to update the local state with the newly added item and reflect the change in the UI before communicating with the backend server to add the item permanently using the POST request. This allows the UI to be responsive and immediately show the new item without waiting for the server response.*/

  }
  // adds/removes checks
  const handleCheck = async (id) => {

    // if the id is equal to that of the element we're looking at, change the check property to opposite of what it is. this is a ternary statement
    // condtion ? if true : if false
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    //filters out the element that we just updated so we can PATCH it (method used to modify existing data)
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked }) 
      //ONLY  updating the checked key
    };
    const reqUrl = `${API_URL}/${id}`; // eg: http://localhost:4000/items/2 
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
        
    /* The apiRequest function is called with the reqUrl and updateOptions as arguments. Inside apiRequest, the fetch function is used to send a network request to the specified URL with the provided options. */
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;