import React, { useState } from 'react';
import './App.css';

let regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

function Employee({ callbackEmployee, id, showError}) {
    //input mezők elmentésére szolgáló változok
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [age, setAge] = useState(0);
    const [CVfield, setCVfield] = useState([]);

    //ha nincs hiba, akkor megpróbálja elküldeni az App.js-nek az adatokat
    if(name.length !== 0 && email.length !== 0 && regEmail.test(email) && jobTitle !== "" && age >= 18 && CVfield.type === "application/pdf"){
        callbackEmployee(id, name, email, jobTitle, age, CVfield);
    }

    //email cím error üzenetének meghatározása
    const emailError = () => {
        if (showError && email.length <= 0) {
            return <label className="error">Email can't be Empty</label>
        }
        if (showError && !regEmail.test(email)) {
            return <label className="error">Email has to valid</label>
        }
    }

    return (
        <div className="employee">
            <h1>Employee data {id + 1}</h1>
            <form noValidate>
                <label htmlFor="name">Name: </label>
                <input type="text" onChange={e => (setName(e.target.value))} />
                <br />
                {showError && name.length <= 0 ?
                    <label className="error">Name can't be Empty</label> : ""}
                <br />

                <label htmlFor="email">Email: </label>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder="exaple@gmail.com" />
                <br />
                {emailError()}
                <br />

                <label htmlFor="jobTitle">Job Title: </label>
                <select onChange={e => setJobTitle(e.target.value)}>
                    <option value=""></option>
                    <option value="accountant">accountant</option>
                    <option value="software developer">software developer</option>
                    <option value="software tester">software tester</option>
                    <option value="manager">manager</option>
                </select>
                <br />
                {showError && jobTitle === "" ?
                    <label className="error">Job can't be Empty</label> : ""}
                <br />

                <label htmlFor="age">Age: </label>
                <input type="number" onChange={e => setAge(e.target.value)} />
                <br />
                {showError && age < 18 ?
                    <label className="error">Age can't be this number</label> : ""}
                <br />

                <label htmlFor="CV">CV field: </label>
                <input type="file" accept=".pdf" onChange={e => setCVfield(e.target.files[0])} ></input>
                <br />
                {showError && CVfield.type !== "application/pdf" ?
                    <label className="error">CV can't be Empty Or has to pdf</label> : ""}
            </form>
        </div>
    );
}

export default Employee;