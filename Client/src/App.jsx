import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import Swal from "sweetalert2";

function App() {
  const URL = "http://localhost:15967/api";
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    code: "",
    firstName: "",
    lastName: "",
  });
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${URL}/get_users`);
      if (response.data) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(`${URL}/create_user`, data);
      console.log(response);
      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: "เพิ่มผู้ใช้สำเร็จ",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const submit = async () => {
    await createUser();
    setModal(false);
    getUsers();
  };
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100dvh", width: "100dvw" }}
      >
        <div
          className="d-flex flex-column justify-content-start align-items-center border border-black rounded-4 p-4"
          style={{ height: "80dvh", width: "50dvw" }}
        >
          <div className="col-12 d-flex flex-row justify-content-between align-items-center">
            <div className="fs-3 fw-bold">รายชื่อผู้ใช้งาน</div>
            <div>
              <button
                className="btn btn-success"
                onClick={() => setModal(true)}
              >
                เพิ่มผู้ใช้งาน
              </button>
            </div>
          </div>

          <div className="row d-flex w-full mt-5" style={{ width: "100%" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ลำดับ</th>
                  <th scope="col">Code</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.code}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      ไม่มีข้อมูล
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        title="เพิ่มผู้ใช้งาน"
        open={modal}
        onOk={submit}
        onCancel={() => setModal(false)}
      >
        <div className="d-flex flex-column gap-3 my-5">
          <div className="row">
            <div className="col-3 d-flex align-items-center">
              <label>Code</label>
            </div>
            <div className="col-9">
              <input
                className="form-control"
                type="text"
                name="code"
                value={data.code}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, code: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-flex align-items-center">
              <label>First-Name</label>
            </div>
            <div className="col-9">
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, firstName: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-flex align-items-center">
              <label>Last-Name</label>
            </div>
            <div className="col-9">
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
