// import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";



const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");

  const fetchUsers = () => {
    axios
      .get("http://localhost:4000/Userdata")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = () => {
    const newUser = {
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
      role: newUserRole,
    };


    axios
      .post("http://localhost:4000/Userdata", newUser)
      .then((res) => {
        setUsers([...users, res.data]);
        alert("user created")
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserRole("user");
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="container" >

      <div className="create-user-form">
        <Typography variant="h5" >Create User</Typography>
        <div className="userform-textfields">
          <TextField
            label="Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            margin="normal"
            variant="outlined"
            style={{ marginBottom: "10px" }}></TextField>

          <TextField
            label="Email"
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Role"
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={createUser}
          disabled={!newUserName || !newUserEmail || !newUserPassword}
          style={{ marginRight: "10px" }}
          className="create-user-button"
        >

          Create User
        </Button>
        <Button variant="contained" color="secondary" onClick={resetForm}>
          Reset Form

        </Button>
      </div>
      <Typography variant="h4" className="users-heading">
        Users
      </Typography>
      <div className="usertable-content">
        {users.length === 0 ? (
          "No users available"
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default UsersPage;
