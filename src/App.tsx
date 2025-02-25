import React, { useState, useEffect } from 'react'
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
  const [apiData_Name, setApiData] = useState(null); /*Okay so, what I think is 
  going on here is that the first thing in the square brackets defines a variable and then the second thing is a sort of updater method
  that you can call to update the first variable (I think they call it "state"???). Anyway it's pretty darn skibbidy cool, ngl. Finna reference it later.
  */
  const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_API_KEY)//print out the api key
  const pullData = async() => { // so frick all that promise ish, idk how that works, we're using async awaits, which just means it awaits stuff. Yeah good luck with that.

    const response = await fetch("https://fortnite-api.com/v2/stats/br/v2?name=N.Y.O",{ //fetch makes request to url to get the data. Stole this from above.
        headers: {
          Authorization: import.meta.env.VITE_API_KEY //The authorization header is needed in order to have access to the api data. And by authorization i mean you need the API KEY to get access to the data
        }
      });
    const stats = await response.json(); //the idea here is we basically stack a bunch of awaits inside each other so they all complete in a row, and then you get the thing you want when they are all done yay.
    setApiData(stats.data.account.name); //so remember that updater method we talked about? We use it here, once all the awaits resolve.
    //by doing this, we set the state to the stats.data.account.name info we pulled, and then we'll use that in the html with string interpolation so that it updates when we click la button.

  };
  //useEffect(() => { //uncomment this if you want to call on mount (basically from the start, instead of clicking the button)
  //  pullData();
  //}, []);
  console.log(apiData_Name); 


  return (
    <>
      <h1>Fortnite <span className="Site-header-style">Stats</span> <span className="Site-header-style">Site</span></h1>
      <form>
        <fieldset>
          <legend>Enter your Fortnite Username</legend>
          <input id="gamer-tag" type="text" name="gamer-tag" placeholder='Enter in your Fortnite gamertag here!'></input>
        </fieldset>
        <button type='submit'>Smash that submit button!</button>
      </form>

      <div>
       <section>
        <img src='' alt=''></img>
          <div className='stats-table'>
            <h1 className='stats-table-header'>This header will have the users username</h1>
            <h2 className='stat-type'>This will display the current stat type</h2>
            
          {/*This will be where the table goes for the stats*/}
          <table>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </table>
          </div>

        <img src='' alt=''></img>
       </section>
       </div>
      
      <footer>

      </footer>
    </>
  )
}

export default App
