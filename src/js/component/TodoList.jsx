import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import { createUser, getUserData, userNewTodo, removeTodo, removeUser} from "../FetchFunctions";


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const [userName, setUserName] = useState("")
  const [isLogged, setIsLogged] = useState(false)


const userExists = async(username) =>{
  try {
    const response = await getUserData(username)
    const data = await response.json()
      return [response.ok,data]
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = () =>{
  if(isLogged){
    removeUser(userName)
    alert("Usuario Eliminado")
    setUserName("")
    setIsLogged(false)
    initializeData()
    return
  }else{alert("You must Log In")}
}


const initializeData = async () =>{
  let username = prompt("Ingresa un Nombre de usuario")
  if(username === null ) {
    alert("You must refresh the page")
  return}
  username = username.toLowerCase().trim()
  let exists = await userExists(username)
  if(!exists[0]){
    let createNewUser = await createUser(username)
    let data = await createNewUser.json()
    setUserName(data.name)
    let checkCreated = await userExists(data.name)
    setTodos(checkCreated[1].todos)
    setIsLogged(true)

    return
  }
  setUserName(exists[1].name)
  setTodos(exists[1].todos)
  setIsLogged(true)

}

useEffect(() =>{
  initializeData()
},[])

const refreshTodos = async () =>{
  try {
    const response = await getUserData(userName)
    const data = await response.json()
    setTodos(data.todos)
  } catch (error) {
    console.log(error)
  }
}

  const createTodos = (obj, index) => {
    
    return (
      <div
      className="list-item d-flex justify-content-between text-secondary"
        key={index}
        itemID={obj.id}
      >
        {obj.label}
        <button className="delete-btn btn text-danger" onClick={(e) => deleteTodo(e)}>X</button>
      </div>
    );
  };

  const addTodo = async (e) => {
    if (e.key != "Enter") return
    if( inputValue === "" || inputValue.length < 2){
      alert(`${inputValue === "" ? "La entrada no puede estar vacia" : "Debe contener 2 o mas caracteres"}`)
      return
    }
    if(todos.includes(inputValue)){
      alert("Esta tarea ya fue ingresada")
      setInputValue("")
      return
    }
    if(!isLogged) {
      alert("You must Log In")
      return
    }

    let response = await userNewTodo(userName, inputValue)
    console.log(response)
    setInputValue("")
    refreshTodos()
  };

const deleteTodo = async (e) =>{
    let itemId = e.currentTarget.parentNode.getAttribute("itemID")
    const response = await removeTodo(itemId)
    refreshTodos()
  }

  return (
    <div className="d-flex">
      <button type="button" className="btn btn-danger" id="eraseUserButton" onClick={() => deleteUser()}>Erase User</button>

    <div className="main-container">
      <div className="sheet ">
        <div className="sheet d-flex flex-column align-items-center table-container">
          <div className="table-head text-center "><h1 className="title">{userName != "" ? `TODOS ${userName.toUpperCase()}` : "Refresh to Login"}</h1></div>
          <div className="table-input w-75">
                    <input type="text" name="tasksInput" id="tasksInput" value={inputValue} placeholder="What needs to be done" className="form-control mb-2" onKeyDown={(e)=>addTodo(e)} onChange={(e) =>{
                      setInputValue(e.currentTarget.value)
                    }}/> </div>


              {todos.length > 0 ? (
                todos.map(createTodos)
              ) : (
                <div className="d-flex justify-content-center ">
                  <h1 className="text-center" style={{ margin: "auto"}}>
                  No tasks, add a task
                  </h1>
                </div>
              )}
            <div className="list-item text-secondary todo-footer" id="todoFooter">
              {todos.length > 0
                ? `${todos.length} ${
                  todos.length === 1 ? "item" : "items"
                } left `
                : "there are no more items left"}{" "}
            </div>
        </div>
      </div>
    </div>
                </div>

  );
};

export default TodoList;
