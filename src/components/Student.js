import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from 'react';
import { Container,Paper } from '@mui/material';
import {Button} from '@mui/material'

export default function Student() {
  const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('');
    const[address,setAddress]=useState('');
    const[students,setStudents]=useState([]);
    const handleClick=(e)=>{
    e.preventDefault();
    const student={name,address};
    console.log(student);
    fetch("http://localhost:8080/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)
    })
    .then(()=>{
      console.log("new student added from frontend");
    }
    )
    }

        useEffect(()=>{
          fetch("http://localhost:8080/student/getAll")
          .then(res=>res.json())
          .then((result)=>{
            setStudents(result);
          })
        },[]);


  return (
    <Container>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Add Student</h1>
      <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
      <TextField id="outlined-basic" label="Address" variant="outlined" value={address} onChange={(e)=>setAddress(e.target.value)}/>
      <Button variant="outlined" onClick={handleClick}>Submit Details</Button>
    </Box>
    
    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}

        </Paper>
      ))
}


    </Paper>

    </Container>

  );
}
