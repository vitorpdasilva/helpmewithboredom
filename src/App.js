import React, { useState } from 'react';
import { BORED_API, ACTIVITIES_TYPES } from './constants';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [activityType, setActivityType] = useState()
  const [activity, setActivity] = useState();
  
  const requestActivity = async () => {
    setLoading(true);
    const suggestedActivity = await fetch(`${BORED_API}${activityType ? `?type=${activityType}` : ''}`).then(data => data.json());
    console.log(suggestedActivity);
    setActivity(suggestedActivity);
    setLoading(false);
  }

  return (
    <div className="App">
      <div className="appDimmer">
        <h1>Help me with boredom</h1>
        <div className="activityTypeWrapper">
          <label>What kind of activity you wanna do ? <br /></label>
          <select onChange={i => setActivityType(i.target.value)} defaultValue={activityType}>
            <option value="">anything</option>
            {ACTIVITIES_TYPES.map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <button onClick={() => requestActivity()}>Suggest something</button>< br />
        <div className="activityWrapper">
          {loading && <p>Let me think...</p>}
          {activity && !loading && (
            <h1>{activity.activity}</h1>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
