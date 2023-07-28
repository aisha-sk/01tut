import React from 'react'
import {FaPlus} from 'react-icons/fa'
import {useRef} from 'react'

const AddItem = ({newItem,setNewItem,handleSubmit}) => { // 3 props
    const inputRef = useRef(null);
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        {/* <label htmlFor='addItem'>Add Item</label> */}
        <input
         autoFocus
         ref={inputRef}
         id='addItem'
         type='text'
         placeholder='Add New Item'
         required
         value={newItem}
         onChange = {(e) => setNewItem(e.target.value)}
         />
        <button
         type='submit'
         aria-label='Add Item'
         onClick = {() => inputRef.current.focus()}
        >
            <FaPlus />

        </button>
    </form>
  )
}

export default AddItem

/* The AddItem component is a functional component in React that renders a form with an input field and a button for adding new items to a list. Let's break down the code and understand what each part does:

import statements: The component imports the required modules from the react and react-icons/fa packages. It also imports the useRef hook from React, which will be used to create a reference to the input field.

AddItem component function: The component function takes three props as parameters: newItem, setNewItem, and handleSubmit.

useRef hook: Inside the component function, it declares a inputRef variable using the useRef hook. This reference will be attached to the input field so that we can interact with it programmatically.

Form: The component returns a form element with the class name addForm. The form has an onSubmit event handler set to the handleSubmit function, which will be called when the form is submitted.

Input field: The input element is the main part of the form. It has the following attributes:

autoFocus: This attribute ensures that the input field is automatically focused when the component mounts, allowing the user to start typing immediately without clicking on the field.
ref: The inputRef is attached as the ref of the input field. This means inputRef.current will point to the DOM node of the input field, allowing us to focus it programmatically using inputRef.current.focus().
id: The id attribute provides a unique identifier for the input field.
type: The type attribute specifies that this is a text input field.
placeholder: The placeholder attribute shows a hint to the user about what should be entered in the field.
required: The required attribute indicates that the input field must be filled before the form can be submitted.
value and onChange: These attributes are used to bind the input field to the newItem state. The value attribute displays the current value of newItem, while the onChange event handler updates the newItem state as the user types in the input field.
Button: The button element represents the "Add Item" button. It has the following attributes:

type: The type attribute is set to "submit", which means this button will trigger the onSubmit event when clicked.
aria-label: The aria-label attribute provides an accessible label for the button, which will be read by screen readers.
onClick: The onClick event handler is set to a function that focuses the input field using inputRef.current.focus(). This allows users to click the button to focus on the input field and start typing.
Icon: Inside the button, there is the FaPlus icon imported from the react-icons/fa package. It represents a plus sign, typically used to indicate adding something.

Overall, the AddItem component provides a user-friendly form for adding new items to a list. The useRef hook is used to maintain a reference to the input field so that it can be focused programmatically when needed. The component uses the handleSubmit function to handle form submission, which will be provided by the parent component that uses AddItem.




*/