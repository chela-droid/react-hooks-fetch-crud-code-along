import React from "react";

function Item({ item ,onUpdatedItem,onDeletedItem}) {
  function handleAddToCartClick(){
    return(
      fetch(`http://localhost:3000/items/${item.id}`,{
        method:"PATCH",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify({
          isInCart:!item.isInCart
        })
      })
      .then((resp)=>(resp.json()))
      .then((updatedItem)=>(onUpdatedItem(updatedItem)))
    )
  }
  function handleDeleteClick(){
    return(
      fetch(`http://localhost:3000/items/${item.id}`,{
        method:"DELETE"
      })
      .then((resp)=>(resp.json()))
      .then((deletedItem)=>(onDeletedItem(deletedItem)))
    )
    
    
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button  onClick={handleDeleteClick} className="remove">Delete</button>
    </li>
  );
}

export default Item;
