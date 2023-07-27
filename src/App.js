
import Header from './header'
import Content from './Content'
import Footer from './Footer'
import {useState} from 'react'
import AddItem from './AddItem'
 
function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || [])

  const [newItem, setNewItem] = useState('')

  const setSave = (newItems) => {
    setItems(newItems)
    localStorage.setItem('shoppinglist', JSON.stringify(newItems))
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked:false, item}
    const listItems = [...items, myNewItem]
    setSave(listItems)
  }

  const handleCheck = (id) => {
    const listItems = items.map((item)=> 
    item.id === id ? {...item, checked: !item.checked} : item)
    setSave(listItems) 
    
  }

  const handleDelete = (id)=> {
    const listItems = items.filter((item)=> item.id !== id)
    setSave(listItems)
    
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
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      
      />
      <Content 
      items={items}
      // setItems={setItems}
      handleCheck={handleCheck}
      handleDelete={handleDelete}/>
      <Footer length={items.length} />
    </div>


  );
}

export default App;
