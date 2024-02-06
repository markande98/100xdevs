import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  try {
    const createTodoQuery = `INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *`;

    const res = await client.query(createTodoQuery, [
      userId,
      title,
      description,
    ]);

    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  try {
    const updateTodoQuery = `UPDATE todos SET done = $1 WHERE id = $2 RETURNING *`;

    const res = await client.query(updateTodoQuery, [true, todoId]);

    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  try {
    const getTodoQuery = `SELECT * FROM todos WHERE user_id = $1`;

    const res = await client.query(getTodoQuery, [userId]);

    return res.rows;
  } catch (error) {
    console.log(error);
  }
}
