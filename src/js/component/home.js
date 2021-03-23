import React, { useState, useEffect } from "react";

//include images into your bundle

//create your first component
export function Home() {
	const [tareas, setTareas] = useState("");
	const [lista, setLista] = useState([]);
	let url = "https://assets.breatheco.de/apis/fake/todos/user/Mvargas";

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
	const updateTodo = NewTodo => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(NewTodo),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadTodo();
				alert(data.result);
			})
			.catch(error => console.error("Error:", error.message));
	};
	const nuevoTodo = () => {
		let array = [];
		fetch(url, {
			method: "POST",
			body: JSON.stringify(array), //se envia un arreglo vacio
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				//console.log("newToDo", data);
				loadTodo();
			}) //cargando la
			.catch(error => console.error("Error:", error))
			.then(response => console.log("Success:", response));
	};
	const deleteTodo = () => {
		fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				//console.log("updateTodo", data);
				nuevoTodo();
			}) //cargando la
			.catch(error => console.error("Error:", error))
			.then(response => console.log("Success:", response));
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
				type="button"
				className="btn btn-outline-primary"
				onClick={() => {
					updateTodo(lista);
				}}>
				{" "}
				Actualizar Lista
			</button>
			<button
				type="button"
				className="btn btn-outline-primary"
				onClick={() => {
					nuevoTodo();
				}}>
				Nuevo
			</button>
			<button
				type="button"
				className="btn btn-outline-primary"
				onClick={() => {
					deleteTodo();
				}}>
				DELETE
			</button>
		</div>
	);
}
