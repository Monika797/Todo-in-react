function Summary({ todoList }) {
  let completed_todos = todoList.reduce((acc, todo) => {
    if (todo.completed) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return (
    <div id="summary">
      <span id="total">Total Todos : {todoList.length}</span>
      <span id="completed">Completed : {completed_todos}</span>
      <span id="remaining">
        Remaining : {todoList.length - completed_todos}
      </span>
    </div>
  );
}
export default Summary;
