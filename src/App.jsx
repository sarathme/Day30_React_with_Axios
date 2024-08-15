import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import UserList from "./UserList";
import { deleteUser, getAllUsers } from "./utils/apiFeatures";
import Loader from "./Loader";
import Modal from "./Modal";
import UserForm from "./UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const users = await getAllUsers();
      console.log(users);
      setUsers(users.data);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  async function handleDelete(id) {
    const deleted = deleteUser(id);

    if (deleted) {
      setUsers((users) => users.filter((user) => user.id !== id));
    }
  }

  return (
    <>
      <Modal onCloseModal={() => setIsModalOpen(false)} modalOpen={isModalOpen}>
        <UserForm onCloseModal={() => setIsModalOpen(false)} />
      </Modal>
      <div className="container">
        <h1 className="primary-heading">React with axios</h1>
        <p className="description">
          Create a React App that allows for CRUD operations with user data
          using React and Axios fetch to interact with a mock API.
        </p>

        <UserList>
          {isLoading && <Loader />}
          <div className="user-card">
            <div className="secondary-heading">Add User</div>
            <button onClick={() => setIsModalOpen(true)}>
              <span className="material-symbols-outlined">+</span>
            </button>
          </div>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onModalOpen={() => setIsModalOpen(true)}
            />
          ))}
        </UserList>
      </div>
    </>
  );
}

export default App;
