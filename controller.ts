// controller.ts
import { Router } from './deps.ts';
import { client } from './db.ts';

const getAllUsers = async (ctx: Router) => {
  const users = await client.query('SELECT * FROM anjng');
  ctx.response.body = users;
};

const getUserById = async (ctx: Router) => {
  const { id } = ctx.params;
  const user = await client.query('SELECT * FROM anjng WHERE id = ?', id);
  ctx.response.body = user.length ? user[0] : { message: 'User not found' };
};

const createUser = async (ctx: Router) => {
    try {
      const { name, email } = await ctx.request.body().value;
      console.log('Received Payload:', { name, email });
  
      if (!name || !email) {
        throw new Error('Name and email cannot be null');
      }
  
      const result = await client.execute('INSERT INTO anjng (name, email) VALUES (?, ?)', [name, email]);
      ctx.response.body = { id: result.lastInsertId };
    } catch (error) {
      console.error('Error:', error);
      ctx.response.status = 400;
      ctx.response.body = { error: 'Bad Request' };
    }
  };
  

const updateUser = async (ctx: Router) => {
  const { id } = ctx.params;
  const { name, email } = await ctx.request.body().value;
  await client.execute('UPDATE anjng SET name = ?, email = ? WHERE id = ?', [name, email, id]);
  ctx.response.body = { message: 'User updated successfully' };
};

const deleteUser = async (ctx: Router) => {
  const { id } = ctx.params;
  await client.execute('DELETE FROM anjng WHERE id = ?', id);
  ctx.response.body = { message: 'User deleted successfully' };
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
