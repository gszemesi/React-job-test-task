import React, { useState } from 'react';
import './App.css';

let regEmail=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

function Company({ callbackCompany, setPrint }) {
    //input mezők elmentésére szolgáló változok
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [numOfEmployees, setNumOfEmployees] = useState(0);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    //"Render" gomb megnyomására megvizsgálja az értékeket és ha helyes elküldi az App.js-nek
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (name.length === 0 || email.length === 0 || !regEmail.test(email) || numOfEmployees<1 || numOfEmployees>100) {
            setError(true)
        }
        else{
            setPrint(false)
            setError(false)
            callbackCompany(name,email,numOfEmployees,description);
        }
    }

    //email cím error üzenetének meghatározása
    const emailError = () => {
        if (error && email.length <= 0) {
            return <label className="error">Email can't be Empty</label>
        }
        if(error && !regEmail.test(email)){
            return <label className="error">Email has to valid</label>
        }
    }


    return (
        <div className="company">
            <h1>Company data</h1>
            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="name">Name: </label>
                <input type="text" onChange={e => setName(e.target.value)} />
                <br />
                {error && name.length <= 0 ?
                    <label className="error">Name can't be Empty</label> : ""}
                <br />

                <label htmlFor="email">Email: </label>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder="exaple@gmail.com" />
                <br />
                {
                    emailError()
                }
                <br />

                <label htmlFor="numOfEmployees">Number of Employees: </label>
                <input type="number" onChange={e => setNumOfEmployees(e.target.value)} />
                <br />
                {error && (numOfEmployees<1 || numOfEmployees>100) ?
                    <label className="error">Number of employee can't be this number</label> : ""}
                <br />

                <label htmlFor="description">Description: </label>
                <br />
                <textarea className="textarea" rows="5" cols="50" onChange={e => setDescription(e.target.value)}></textarea>
                <br />
                <button>Render</button>
            </form>


        </div>
    );
}

export default Company;
