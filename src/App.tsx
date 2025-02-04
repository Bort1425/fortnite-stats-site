import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function QueryFortniteAPI(){
  console.log("Juice")
  fetch("https://fortnite-api.com/v2/stats/br/v2?name=N.Y.O",{ //fetch makes request to url to get the data
    headers: {
      Authorization: import.meta.env.VITE_API_KEY //The authorization header is needed in order to have access to the api data. And by authorization i mean you need the API KEY to get access to the data
    }
  }).then(function(resp){//to respond to whatever the promise was
    console.log(resp)
    return resp.json() //Here we are getting the json file from the response that we got after the fetch
  }).then(function(data){//Then in order to do something with the json files data we have to use .then and pass a callback function that has the data as the parameter
    console.log(data)//Then we log this data into the console
  });
}

function App() {
  const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_API_KEY)//print out the api key


  return (
    <>
      <div>
        <button onClick={QueryFortniteAPI}>Test</button>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
