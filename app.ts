// app.ts
import { Application, Router } from './deps.ts';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './controller.ts';

const router = new Router();

router.get('/users', getAllUsers)
  .get('/users/:id', getUserById)
  .post('/users', createUser)
  .put('/users/:id', updateUser)
  .delete('/users/:id', deleteUser);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;

console.log(`Server is running on port ${PORT}`);

await app.listen({ port: PORT });
