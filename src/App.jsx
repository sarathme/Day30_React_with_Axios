import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import UserList from "./UserList";
import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./utils/apiFeatures";
import Loader from "./Loader";
import Modal from "./Modal";
import UserForm from "./UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("ready");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setStatus("fetching");
      const users = await getAllUsers();
      console.log(users);
      setUsers(users.data);
      setStatus("ready");
    }

    fetchUser();
  }, []);

  async function handleAddUser(userData) {
    const newUser = await addUser(userData);

    setUsers((users) => [newUser, ...users]);
    setStatus("ready");
    setIsModalOpen(false);
  }

  async function handleEditUser(id, updatedData) {
    const updatedUser = await updateUser(id, updatedData);

    setUsers((users) =>
      users.map((user) => {
        if (user.id === id) {
          return updatedUser;
        }

        return user;
      })
    );

    setStatus("ready");
    setEditUser(null);
    setIsModalOpen(false);
  }

  async function handleDelete(id) {
    const deleted = deleteUser(id);

    if (deleted) {
      setUsers((users) => users.filter((user) => user.id !== id));
    }
  }

  return (
    <>
      <Modal onCloseModal={() => setIsModalOpen(false)} modalOpen={isModalOpen}>
        <UserForm
          onCloseModal={() => setIsModalOpen(false)}
          setStatus={setStatus}
          status={status}
          onAddUser={handleAddUser}
          edit={editUser}
          onEditUser={handleEditUser}
        />
      </Modal>
      <div className="container">
        <h1 className="primary-heading">React with axios</h1>
        <p className="description">
          Create a React App that allows for CRUD operations with user data
          using React and Axios fetch to interact with a mock API.
        </p>

        <UserList>
          {status === "fetching" && <Loader />}
          <div className="user-card">
            <div className="secondary-heading">Add New User</div>
            <button
              onClick={() => {
                setEditUser(null);
                setIsModalOpen(true);
              }}>
              <span className="material-symbols-outlined">+</span>
            </button>
          </div>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onModalOpen={() => setIsModalOpen(true)}
              setEditUser={setEditUser}
            />
          ))}
        </UserList>
      </div>
    </>
  );
}

export default App;
