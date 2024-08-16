import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function addUser(userData) {
  try {
    const res = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.status === 201) throw new Error("Error creating a new user");

    res.data.id = Math.round(res.data.id * (Math.random() * 10));
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllUsers() {
  try {
    const users = await axios.get(`${API_BASE_URL}/users`);
    // const users = await res.json();
    return users;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(id, updatedUser) {
  try {
    const res = await axios.patch(`${API_BASE_URL}/users/${id}`, updatedUser, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(res);

    if (res.status !== 200) throw new Error("Unable to edit User");

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(id) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/users/${id}`);
    if (res.status !== 200) throw new Error("Error while deleting user");
    return true;
  } catch (err) {
    console.log(err);
  }
}
