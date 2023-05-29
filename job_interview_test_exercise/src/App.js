import React, { useState } from 'react';
import './App.css';
import Company from './Company';
import Employee from './Employee';

let CompanyData = [] //vállalat adatai
let EmployeeData = [] //alkalmazottak adatai

function App() {
  const [isPrint, setPrint] = useState(false) //boolean, kiíratás megtörténhet-e
  const [refresh_value, refresh] = useState(false) //boolean, az oldalon lévő adatok frissítéséhez felvett érték (értéke független mindentől)
  const [showError, setShowError] = useState(false) //boolean, a „Save” gomb lenyomása után megjelennek az estleges hiba üzenetek az alkalmazotti objektumokban

  //A Company.js által küldött vállati adatokat menti el
  const callbackCompany = (n, e, num, d) => {
    CompanyData = []
    CompanyData.push({
      name: n,
      email: e,
      numOfEmployees: num,
      description: d
    });
    EmployeeData = []

    setShowError(false)
    refresh(!refresh_value)
  }

  //A Employee.js által küldött alkalmazottak adatait menti el
  const callbackEmployee = (id, name, email, jobTitle, age, CVfield) => {
    let l = true;
    for (var i = 0; i < EmployeeData.length; i++) {
      if (EmployeeData[i].id === id) {
        EmployeeData[i].name = name
        EmployeeData[i].email = email
        EmployeeData[i].jobTitle = jobTitle
        EmployeeData[i].age = age
        EmployeeData[i].CVfield = CVfield
        l = false
      }

    }
    if (l) {
      EmployeeData.push({
        id: id,
        name: name,
        email: email,
        jobTitle: jobTitle,
        age: age,
        CVfield: CVfield
      })
    }
  }

  //Megváltoztatja setPrint értékét és igy láthatóak lesznek az adatok az oldal alján.
  const save = (e) => {
    setShowError(true)
    if (CompanyData.length !== 0 && parseInt(CompanyData[0].numOfEmployees) === EmployeeData.length) {
      setPrint(true)
    }
    refresh(!refresh_value)
  }

  return (
    <div className="App">
      <Company callbackCompany={callbackCompany} setPrint={setPrint} />
      <br />

      <div>
        {
          CompanyData.length!==0 ? Array.apply(0, Array(parseInt(CompanyData[0].numOfEmployees))).map(function (x, i) {
            return <Employee callbackEmployee={callbackEmployee} key={i} id={i} showError={showError} />
          }) : ''
        }
      </div>
      {
        CompanyData.length!==0 ? <button onClick={save}>Save</button>:""
      }
      

      <ul>
        {isPrint ? CompanyData.map((item,x) => {
          return <li key={x}>{"Company name: " + item.name + ",  Company email: " + item.email + ",  Number of Employess: " + item.numOfEmployees + ",  Description: " + item.description}</li>
        }) : ""
        }
      </ul>
      <ol>
        {isPrint ? EmployeeData.map(item => {
          return <li key={item.id}>{"Employee name: " + item.name + ",  Employee email: " + item.email + ",  Job tittle: " + item.jobTitle + ",  Age:" + item.age+",  CV: "+ item.CVfield}</li>
        }) : ""
        }
      </ol>



    </div>
  );
}

export default App;
