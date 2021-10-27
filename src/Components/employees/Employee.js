import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Employeecard from './EmployeeCard';
// import { Alert } from '@material-ui/lab';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com`
})


function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

function Employee() {

  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true}  name={rowData === undefined ? " " : rowData.name ? rowData.name: rowData.username} /> },
    { title: "Name", field: "name" },
    {title: "User Name", field: "username"},
    {title: "email", field: "email"},
    { title: "Mobile Number", field: "phone" }
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [employeeProfile, setemployeeProfile] = useState([]);
  const [showEmpProfile, setshowEmpProfile] = useState(false);

  useEffect(() => {
    api.get("/users")
        .then(res => {
          setData(res.data)
        })
        .catch(error => {
          console.log("Error")
        })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.login === "") {
      errorList.push("Please enter Name")
    }
    // if (newData.last_name === "") {
    //   errorList.push("Please enter User Name")
    // }
    // if (newData.email === "" || validateEmail(newData.email) === false) {
    //   errorList.push("Please enter a valid email")
    // }
    if (newData.type === "") {
      errorList.push("Please enter employee type")
    }

    if (errorList.length < 1) {
      // const dataUpdate = [...data];
      // const index = oldData.tableData.id;
      // dataUpdate[index] = newData;
      // setData([...dataUpdate]);
      // localStorage.setItem("data", JSON.stringify([...dataUpdate]));
      // resolve()
      // setErrorMessages([])
      // setIserror(false)
      api.put("/updateEmployee", newData)
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()

      })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }

  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if (newData.name === undefined) {
      errorList.push("Please enter Name")
    }
    if (newData.username === undefined) {
      errorList.push("Please enter User Name")
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email")
    }
    if (newData.phone === undefined) {
      errorList.push("Please enter mobile number")
    }

    if (errorList.length < 1) { 
      // let dataToAdd = [...data];
      // dataToAdd.push(newData);
      // setData(dataToAdd);
      // console.log(dataToAdd)
      // localStorage.setItem("data", JSON.stringify(dataToAdd));
      // resolve()
      // setErrorMessages([])
      // setIserror(false)
      api.post("/saveEmployee", newData)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }


  }

  const handleRowDelete = (oldData, resolve) => {
    // const dataDelete = [...data];
    // const index = oldData.tableData.id;
    // dataDelete.splice(index, 1);
    // setData([...dataDelete]);
    // localStorage.setItem("data", JSON.stringify([...dataDelete]));
    // resolve()
    // setErrorMessages([])
    // setIserror(false)

    // https://jsonplaceholder.typicode.com/users/posts/:userid
    api.delete(`/users/posts:${oldData.id}`)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }
  // const handleRowClick = (event, rowData) => {
  //   setshowEmpProfile(true);
  //   setemployeeProfile(rowData);
  
  // };
  return (
    <div className="App">
      {!showEmpProfile? 
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <div>
            {iserror &&
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
                })}
              </Alert>
            }
          </div>
          <MaterialTable
            title="Employee data"
            columns={columns}
            data={data}
            icons={tableIcons}
            // onRowClick={handleRowClick}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);

                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve)
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve)
                }),
            }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>:null}
      
    </div>
  );
}

export default Employee;