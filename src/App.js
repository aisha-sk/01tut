
import Header from './header'
import SearchItem from './SearchItem'
import Content from './Content'
import Footer from './Footer'
import {useState, useEffect} from 'react'
import AddItem from './AddItem'
 
function App() {

  const API_URL = 'http://localhost:4000/items' 
  const [items, setItems] = useState([])
  // JSON.parse(localStorage.getItem('shoppingList')) || []

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Failed to fetch data')}
        const listItems = await response.json()
        console.log(listItems)
        setItems(listItems)
      } catch (err){
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    (async () => await fetchItems())()
    // to simulate a lag while fetching items (loading...): 

    // setTimeout(() => {
    //   (async () => await fetchItems())()
    // }, 4000)
    
  }, [])


  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked:false, item}
    const listItems = [...items, myNewItem]
    setItems(listItems)
  }

  const handleCheck = (id) => {
    const listItems = items.map((item)=> 
    item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItems) 
    
  }

  const handleDelete = (id)=> {
    const listItems = items.filter((item)=> item.id !== id)
    setItems(listItems)
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return;
    //additem
    addItem(newItem)
    setNewItem('')
  }


  return (

    <div className="App">
      <Header title="Grocery List" />
      <SearchItem
        search={search}
        setSearch={setSearch}
        />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      
      />
      <main>
        {isLoading && <p> Loading Items...</p>}
        {fetchError && <p style={{color : 'red'}} >{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        // setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}/>}
      </main>
      <Footer length={items.length} />
    </div>


  );
}

export default App;
