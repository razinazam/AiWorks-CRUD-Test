import React, { useState } from "react";
import { getUsers, createUser, createUserWithId, removeUser } from "./ApiService";
import "./styles.css";

const CreateUserForm = ({ create, handelAutoSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");


  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handelAutoSaveAction = (FieldName) => {
    let obj =
      { firstName: firstName, lastName: lastName, email: email }
    handelAutoSave(obj)
  }
  return (
    <>
      <form
      className="Form-container"
        onSubmit={(createUserEvent) => {
          createUserEvent.preventDefault();

          // implementation required.

          create(firstName, lastName, email)

          resetForm();
        }}
      >
        <input
          className="input-text"
          name="firstName"
          placeholder="First"
          onBlur={() => handelAutoSaveAction("firstName")}

          value={firstName}
          required
          onChange={(event) => { setFirstName(event.target.value); }}
        />
        <input
          className="input-text"
          name="lastName"
          placeholder="Last"
          value={lastName}
          onBlur={() => handelAutoSaveAction("lastName")}
          required
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          className="input-text"
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onBlur={() => handelAutoSaveAction("email")}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <br/>
        <input className="button" type="submit" value="Add User" />
      </form>

    </>
  );
};

const ListUsers = ({ users, remove }) => (
  <div>
    <h1>Users</h1>
    <ul className="user-list">
      {users.map((user) => (
        <li className="user-detail" key={user.userId}>
          <span className="display-text">{user.firstName}</span>
          <span className="display-text">{user.lastName}</span>
          <span className="display-text">{user.email}</span>
          <button onClick={() => remove(user)}>X</button>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = ({ undo, redo }) => (
  <div className="footer">
    <button onClick={undo}>Undo</button>
    <button onClick={redo}>Redo</button>
  </div>
);

export default function App() {
  // states
  const [users, setUsers] = useState([]);
  const [history, sethistory] = useState([]);



  const handelAutoSave = (autosaveUserobj) => {
    console.log(autosaveUserobj);
  }

  // handlers
  const create = (firstName, lastName, email) => {
    let newuserObject = { firstName, lastName, email, userId: 1 + 1 }
    setUsers((preevstate) => [...preevstate, newuserObject])
    // implementation required.s
  };
  const remove = (user) => {
    const DeleteUserArray = [...users]
    const index = DeleteUserArray.indexOf(user);
    if (index > -1) {
      DeleteUserArray.splice(index, 1);
    }
    setUsers(DeleteUserArray)
    // implementation required.
  };


  const undo = () => {
    let usersArray = [...users]
    let Undouser = usersArray.pop()
    sethistory((prevstate) => [...prevstate, Undouser])

    setUsers(usersArray)
    // implementation required.
  };
  const redo = () => {
    let usersArray = [...users]
    let usersHistoryArray = [...history]
    var item = usersHistoryArray.pop();
    if (item) {
      usersArray.push(item);
    }
    setUsers(usersArray)
    sethistory(usersHistoryArray)
    console.log(usersArray, usersHistoryArray);
  };

  return (
    <div className="App">
      <h1>Create User</h1>
      <CreateUserForm handelAutoSave={handelAutoSave} create={create} />
      <ListUsers users={users} remove={remove} />
      <Footer undo={undo} redo={redo} />
    </div>
  );
}
