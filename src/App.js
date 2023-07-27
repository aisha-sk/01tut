
import Header from './header'
import SearchItem from './SearchItem'
import Content from './Content'
import Footer from './Footer'
import {useState, useEffect} from 'react'
import AddItem from './AddItem'
 
function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || [])

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(items))},[])


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
      <Content 
      items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
      // setItems={setItems}
      handleCheck={handleCheck}
      handleDelete={handleDelete}/>
      <Footer length={items.length} />
    </div>


  );
}

export default App;
