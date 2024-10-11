import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        // console.log(response.data);
        setUsers(response.data.user);
      });
  }, [filter]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
        console.log(response.data.balance);
      });
  }, []);
  return (
    <div>
      <div className="w-full flex justify-between bg-slate-200 p-4 mt-5">
        <b>PayTM App</b>
        {/* <b>Hello {users[users.length - 1].firstName}</b> */}
      </div>

      <div className="my-3 p-2 font-medium">Your balance Rs {Math.floor(balance)}</div>
      <div className="mt-3 p-2 font-medium">Users</div>
      <input
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="Search User"
        className="rounded-lg p-2 w-[1500px] m-2 mb-7 border border-black"
      />
      {users.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
  );
};

export default DashBoard;
