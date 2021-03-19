import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [tareas, setTareas] = useState("");
	const [lista, setLista] = useState([]);
	var url = "https://assets.breatheco.de/apis/fake/todos/user/Mvargas";
	const loadTodo = () => {
		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				setLista(data);
				console.log(data);
			})
			.catch(error => console.error("Error:", error.message));
	};
	const updateTodo = lista => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(lista),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadTodo();
				alert(data.result);
			})
			.catch(error => console.error("Error:", error.message));
	};
	useEffect(() => {
		loadTodo();
	}, []);
	return (
		<div className="text-center mt-5">
			<h1> Todo List</h1>
			<input
				value={tareas}
				onChange={e => {
					setTareas(e.target.value);
				}}
				onKeyPress={e => {
					if (e.key == "Enter") {
						let vj = {
							label: tareas,
							done: false
						};
						setLista(lista.concat(vj));
						setTareas("");
						console.log("Mi lista", lista);
					}
				}}
			/>
			{!lista
				? "Cargando"
				: lista.map((item, index) => {
						return (
							<li
								className="list-group-item d-flex justify-content-between align-items-center"
								key={index}
								onDoubleClick={() => {
									setLista(
										lista.filter(
											(itemf, indexf) => indexf !== index
										)
									);
								}}>
								{item.label}
							</li>
						);
				  })}
			<button
				onClick={() => {
					updateTodo(lista);
				}}>
				{" "}
				Actualizar Lista
			</button>
		</div>
	);
}
