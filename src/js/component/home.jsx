import React,{useState,useEffect} from "react";
import TodoList from "./TodoList";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component



const Home = () => {
	
	return (
		<div className="d-flex flex-column align-items-center">
		<TodoList />	
		</div>
	);
};

export default Home;
