import './App.css'
import CreateForm from './components/CreateForm'
import UpdateForm from './components/UpdateForm'
import { useState, useEffect } from 'react'
import { Table, ButtonGroup, Button } from 'react-bootstrap'
import axios from 'axios'

function App() {
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [lstUser, setLstUser] = useState([])
  const [userId, setUserId] = useState()

  const handleGet = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://localhost:7067/api/User/GetAllUsers'
      })

      const result = response.data
      
      const formatDate = result.map(c => {
        if(c.dob && typeof c.dob === 'string'){
          return {
            ...c,
            dob: c.dob.split('T')[0]
          }
        }
        return c
      })

      setLstUser(formatDate)
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  const handleDel = async (id) => {
    try {
      const response = await axios({
        method: 'delete',
        url: `https://localhost:7067/api/User/delete/${id}`
      })

      console.log('del success');
      handleGet()

    } catch (error) {
      console.log('Error: ', error);

    }
  }

  const handleShowUpdate = (param) => {
    setShowUpdate(true)
    setUserId(param)
  }

  useEffect(() => {
    handleGet()
  }, [])

  return (
    <div className="main_page">
      <div className="header">
        <h2>Quản lý thông tin người dùng</h2>
        <div className='list_btn'>
          <button onClick={() => setShowCreate(true)}>Thêm</button>
        </div>
      </div>
      <hr />
      <div className='main'>
        <CreateForm show={showCreate} onHide={() => setShowCreate(false)} reloadData={handleGet} />
        <UpdateForm show={showUpdate} onHide={() => setShowUpdate(false)} reloadData={handleGet} id={userId} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Ngày sinh</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {lstUser.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.dob}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-warning" onClick={() => handleShowUpdate(user.id)}>Sửa</Button>
                    <Button variant="outline-danger" onClick={() => handleDel(user.id)}>Xoá</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default App
