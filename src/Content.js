import React from 'react'

import ItemLister from './ItemLister'
const Content = ({items, handleCheck, handleDelete}) => {


  return (
    <>
      {items.length ? (
        <ItemLister
          items = {items}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
        />


      ) : (
        <p style={{marginTop: '2rem'}}>Your list is empty.</p>
      )}
        
    </>
  )
}

export default Content
