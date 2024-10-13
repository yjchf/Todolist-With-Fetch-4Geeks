const BASEURL = "https://playground.4geeks.com/todo";

// Función para obtener datos de usuario
export const getUserData = async (username) => {
    try {
        const response = await fetch(BASEURL + `/users/${username}`);
        if (response.status === 200 || response.status === 404) {
            return response; 
        } 
    } catch (error) {
        throw error;  // Propaga el error para que pueda ser manejado en la función que llama
    }
};

// Función para crear un usuario
export const createUser = async (username) => {
    try {
        const response = await fetch(BASEURL + `/users/${username}`, {
            method: 'POST'
        }); 
        if (response.ok) {
            return response;
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.log(error.message);
        throw error;  // De nuevo, propaga el error para manejarlo adecuadamente
    }
};

export const userNewTodo = async (username, todo,isDone=false) =>{
    try {
        const response = await fetch(BASEURL+`/todos/${username}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({label: todo, is_done: isDone})
        })
        if(response.ok){
            let data = await response.json()
            return data
        }
    } catch (error) {
        
    }
}

export const removeTodo = async (todoId) =>{
    try {
        const response = await fetch(BASEURL+`/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
              }
        })
    } catch (error) {
        console.log(error.message)
        throw error
    }
}


export const removeUser = async (user_name) =>{
    try {
        const response = await fetch(BASEURL+`/users/${user_name}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
              }
        })
    } catch (error) {
        
    }
}