import React, { useState, useEffect, FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function QueryFortniteAPI() {
  console.log("Juice")
  fetch("https://fortnite-api.com/v2/stats/br/v2?name=BleachDrinker77", { //fetch makes request to url to get the data
    headers: {
      Authorization: import.meta.env.VITE_API_KEY //The authorization header is needed in order to have access to the api data. And by authorization i mean you need the API KEY to get access to the data
    }
  }).then(function (resp) {//to respond to whatever the promise was
    console.log(resp)
    return resp.json() //Here we are getting the json file from the response that we got after the fetch
  }).then(function (data) {//Then in order to do something with the json files data we have to use .then and pass a callback function that has the data as the parameter
    console.log(data)//Then we log this data into the console
  });
}

type StatsProps = {//we say we have a new type called stats props and the name is a string
  name: string;
  data: {
    score: number; scorePerMatch: number; wins: number; kills: number;
    deaths: number; kd: number; killsPerMatch: number; matches: number;
    winRate: number; minutesPlayed: number; playersOutlived: number;
  }
}

function Stats(props: StatsProps) {
  return (
    <>
      <p>Score: {props.data.score}</p>
      <p>ScorePerMatch: {props.data.scorePerMatch}</p>
      <p>Wins: {props.data.wins}</p>
      <p>kills: {props.data.kills}</p>
      <p>KillDeath Ratio: {props.data.kd}</p>
      <p>KillsPerMatch: {props.data.killsPerMatch}</p>
      <p>Matches: {props.data.matches}</p>
      <p>winRate: {props.data.winRate}</p>
      <p>minutesPlayed: {props.data.minutesPlayed}</p>
      <p>playersOutlived: {props.data.playersOutlived}</p>
    </>
  )
}

function Results(props){

  //if we dont get anything say to enter something
  if(props.apiData == null){
    return (
      <>
      <p>Please Enter Your Fortnite UserName</p>
      </>
    )

  }else if(props.apiData.status == 200){
    return (
      <>
       <div>
        <section>
          <img src='' alt=''></img>
          <div className='stats-table'>

            <h1 className='stats-table-header'>{props.apiData?.data.account.name} Level: {props.apiData?.data.battlePass.level}</h1>

            <h2 className='stat-type-overall'>Overall</h2>
            <Stats name="Overall" data={props.apiData?.data.stats.all.overall} />
            
            <h2 className='stat-type'>Solo</h2>
            <Stats name="Solo" data={props.apiData?.data.stats.all.solo} />

            <h2 className='stat-type'>Duo's</h2>
            <Stats name="Solo" data={props.apiData?.data.stats.all.duo} />

            <h2 className='stat-type'>Squad</h2>
            <Stats name="Solo" data={props.apiData?.data.stats.all.squad} />

            {/* <p>Deaths: {apiData?.data.stats.all.solo.deaths}</p>
            <p>Kills: {apiData?.data.stats.all.solo.kills}</p>
            <p>KillDeath Ratio: {apiData?.data.stats.all.solo.kd}</p> */}

            {/*This will be where the table goes for the stats*/}
            {/*
          <table>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </table>
          */}
          </div>

          <img src='' alt=''></img>
        </section>
      </div>
      
      </>
    )

  }else if(props.apiData.status == 403){
    return (
    <>
    <h1>Nah...We can't show you those stats. Try again :D ???</h1>
    </>)
  }else if(props.apiData.status == 404){
    return (
    <>
    <h1>Hey. The person you're looking for is so sweaty they don't even exist. Enter another username Champ. </h1>
    </>
    )
  }
  
}

function App() {
  const [apiData, setApiData] = useState(null); /*Okay so, what I think is 
  going on here is that the first thing in the square brackets defines a variable and then the second thing is a sort of updater method
  that you can call to update the first variable (I think they call it "state"???). Anyway it's pretty darn skibbidy cool, ngl. Finna reference it later.
  */
  console.log("Big Data:", apiData);
  const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_API_KEY)//print out the api key
  // const pullData = async() => { // so frick all that promise ish, idk how that works, we're using async awaits, which just means it awaits stuff. Yeah good luck with that.

  //   const response = await fetch("https://fortnite-api.com/v2/stats/br/v2?name=N.Y.O",{ //fetch makes request to url to get the data. Stole this from above.
  //       headers: {
  //         Authorization: import.meta.env.VITE_API_KEY //The authorization header is needed in order to have access to the api data. And by authorization i mean you need the API KEY to get access to the data
  //       }
  //     });
  //   const stats = await response.json(); //the idea here is we basically stack a bunch of awaits inside each other so they all complete in a row, and then you get the thing you want when they are all done yay.
  //   setApiData(stats.data.account.name); //so remember that updater method we talked about? We use it here, once all the awaits resolve.
  //   //by doing this, we set the state to the stats.data.account.name info we pulled, and then we'll use that in the html with string interpolation so that it updates when we click la button.

  // };
  //useEffect(() => { //uncomment this if you want to call on mount (basically from the start, instead of clicking the button)
  //  pullData();
  //}, []);
  //console.log(apiData_Name); 

  async function fetchFortniteStats(gamerTag: string) { //async - no other code is allowed to run until this function does
    let response = await fetch("https://fortnite-api.com/v2/stats/br/v2?name=" + gamerTag, { //fetch makes request to url to get the data
      headers: {
        Authorization: import.meta.env.VITE_API_KEY //The authorization header is needed in order to have access to the api data. And by authorization i mean you need the API KEY to get access to the data
      } 
    })
    let data = await response.json();
    console.log(data);
    setApiData(data);
  }

  //Function that handles the username submittion form
  function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {//SubmitEvent has the type of FormEvent <>--> annotation and inside is the type of the target
    submitEvent.preventDefault();//.preventDefault stops the browser from refreshing
    console.log(submitEvent);
    const data = new FormData(submitEvent.currentTarget)//FormData is an object that takes in a formElement aka the submitEvent's current target
    let gamerTag = data.get('gamer-tag'); //look for an input with name of gamer tag
    console.log(gamerTag);

    if ((gamerTag == null) || (gamerTag == undefined)) {
      return 0;
    }

    fetchFortniteStats(gamerTag.toString());
  }

  return (
    <>
      <h1>Fortnite <span className="Site-header-style">Stats</span> <span className="Site-header-style">Site</span></h1>
      <form onSubmit={handleSubmit}> 
        <fieldset>
          <legend>Enter your Fortnite Username</legend>
          <input id="gamer-tag" type="text" name="gamer-tag" placeholder='Enter in your Fortnite gamertag here!'></input>
        </fieldset>
        <button type='submit'>Smash that submit button!</button>
      </form>

      <Results apiData={apiData}/> //results will take in apidata for the function

      <footer>

      </footer>
    </>
  )
}

export default App
