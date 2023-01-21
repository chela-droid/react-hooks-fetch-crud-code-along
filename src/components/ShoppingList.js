import React, { useState,useEffect} from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
 
  useEffect(()=>{
    fetch("http://localhost:3000/items")
    .then((resp)=>resp.json())
    .then((items)=>setItems(items))
  },[])
  
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  
  function handleAddItem(newItem){
    setItems([...items,newItem])

  
  }

  function handleUpdateItem(updatedItem){
    const itemUpdate=items.map((item)=>{
      if(item.id===updatedItem.id){
        return (updatedItem)
      }else{
        return item
      }
    })
    setItems(itemUpdate)

  }
  function handleDeletedItem(deletedItem){
    const itemDeleted=items.filter((item)=>item.id!==deletedItem.id)
    setItems(itemDeleted);
  }
  
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem = {handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdatedItem={handleUpdateItem} 
          onDeletedItem={handleDeletedItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
