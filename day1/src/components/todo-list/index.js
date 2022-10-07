import React, { useState, useEffect } from "react";
import Button from "../button";
import classes from "./style.module.css";

const url = "https://jsonplaceholder.typicode.com/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState();
  const [itemSize, setItemSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Id'ye göre sorting işlemleri
  let idSorting = () => {
    if (selectedTodo !== "id") {
      setTodos([...todos].reverse());
    } else {
      setTodos([...todos].sort((a, b) => a.id - b.id));
    }
  };

  // Durum bilgisine göre sorting işlemleri
  let completedSorting = () => {
	if (todos[0].completed) {
		setTodos([...todos].sort((a, b) => a.completed - b.completed));
	} else {
		setTodos([...todos].sort((a, b) => b.completed - a.completed));
	}
  }

  // Pagination işlemleri
  const pages = [];
  const start = currentPage * itemSize;
  const end = start - itemSize;
  const currentTodo = todos.slice(end,start);
  
  const renderPagination = () => {
	let total = todos.length;
	
	const paginate = (pages) => setCurrentPage(pages);
	for (let i = 1; i <= Math.ceil(total / itemSize); i++) {
		pages.push(i)
	}

	return (
		<nav>
			<ul className="pagination">
				{pages.map(num => (
					<li key={num} className="page-item">
						<a onClick={() => paginate(num)} href="#" className="page-link">{num}</a>
					</li>
				))}
			</ul>
		</nav>
	)
  }

  const renderThead = () => {
    return (
      <thead>
        <tr>
          <th onClick={idSorting} className={classes.click}>id</th>
          <th>başlık</th>
          <th onClick={completedSorting} className={classes.click}>durum</th>
          <th>Aksiyon</th>
        </tr>
      </thead>
    );
  };

  const remove = (todo) => {
    if (window.confirm("Silmek üzerisiniz emin misiniz")) {
      setTodos((prev) => {
        return prev.filter((x) => x.id != todo.id);
      });
    }
  };

  const edit = (todo) => {
    setSelectedTodo(todo);
  };

  const renderBody = () => {
    return (
      <tbody>
        {currentTodo.slice(0, 15).map((todo, index) => {
          return (
            <tr key={index}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? "Tamamlandı" : "Yapılacak"}</td>
              <td>
                <Button
                  className={`btn btn-sm btn-danger ${classes.actionButton} `}
                  onClick={() => remove(todo)}
                >
                  Sil
                </Button>
                <Button
                  onClick={() => edit(todo)}
                  className="btn btn-sm btn-warning"
                >
                  Düzenle
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const renderEditForm = () => {
    return (
      <div>
        <input type={"text"} />
        <input type="check" />
        <Button>Kaydet</Button>
        <Button onClick={() => setSelectedTodo(undefined)}>Vazgeç</Button>
      </div>
    );
  };
  return (
    <div className={`${classes.container} container`}>
      {selectedTodo && renderEditForm()}
      <table className="table">
        {renderThead()}
        {renderBody()}
      </table>
	  {renderPagination()}
    </div>
  );
};

export default TodoList;
