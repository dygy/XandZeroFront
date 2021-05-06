import React, {useEffect, useState} from 'react';
import './App.css';
import Table from "../Table/Table";
import api from "../../api/api";
import RefreshButton from "../RefreshButton/RefreshButton";

function App() {
   const [uuid, setUuid] = useState(localStorage.getItem('id'))

    useEffect(()=>{
       if (!uuid){
           api.giveSlot().then(e=> {
               localStorage.setItem('id', e)
               setUuid(e)
           })
       }
   },[uuid])

    useEffect(()=> {
        setInterval(()=>{
            if (uuid) {
                api.checkUUID(uuid || '').then(value => {
                    if (!value) {
                        setUuid(null)
                    }
                })
            }
        }, 10000)
    }, [])

    return (
    <div className="App">
      <header className="App-header">
          <RefreshButton setUuid={setUuid} />
          {uuid &&<Table uuid={uuid} />}
      </header>
    </div>
  );
}

export default App;
