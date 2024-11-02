import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import './styles.css'

export const AnimationComponent = () => {
  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (e) => {
    if (e.code === "Enter") {
      setTodoList([...todoList, e.target.value]);
      e.target.value = "";
    }
  };

  const deleteTodo = (index) => {
    const temp = todoList;
    temp.splice(index, 1);
    setTodoList([...temp]);
  };

  return (
    <div>
      <div className="page-container">
        <h1 className="title-text">🧾 Todo Webapp</h1>
        <div className="todo-card">
          <div className="todo-card-header">
            <input
              placeholder="Press Enter to Add Todo ..."
              type="text"
              className="todo-input"
              onKeyDown={addNewTodo}
            />
          </div>
          <div className="todo-card-body">
            <AnimatePresence mode="popLayout">
              {todoList.length ? (
                todoList.map((todo, index) => {
                  return (
                    <motion.div
                      key={todo}
                      className="todo-item"
                      layout
                      initial={{ opacity: 0, x: -400, scale: 0.5 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 200, scale: 1.2 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <h3>
                        {index + 1}. {todo}
                      </h3>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          deleteTodo(index);
                        }}
                      >
                        &times;
                      </button>
                    </motion.div>
                  );
                })
              ) : (
                <h1 className="empty-message"> 🙁 No Todos Here to Display</h1>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
