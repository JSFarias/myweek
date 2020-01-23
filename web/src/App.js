import React, { useEffect, useState } from 'react'
import api from './services/api'

import './Global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'


function App() {

  const [devs, setDevs] = useState([])

  const [github_username, setGitHubUserName] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    loadDevs();

  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) =>{

        const { latitude, longitude } = success.coords
        setLatitude(latitude);
        setLongitude(longitude);

      },
      (failed) =>{
        console.log(failed)
      },
      {
        timeout: 30000
      }
    );
  }, []);  

  async function handleSubmit(e){
    e.preventDefault();
    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    })

    setGitHubUserName('');
    setTechs('');

    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required 
              value ={github_username}
              onChange={e => setGitHubUserName(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required 
              value ={techs}
              onChange={e => setTechs(e.target.value)}/>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salvar</button>

        </form>
      </aside>
      <main>
        <ul>

          {devs.map(dev => (              
             <li key={dev._id} className="dev-item">
               <header>
                 <img src={dev.avatar_url} alt={dev.name} />
                 <div className="user-info">
                   <strong>{dev.name}</strong>
                    <span>{dev.techs.join(", ")}</span>
                 </div>
               </header>
          <p>{dev.bio}</p>
               <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
             </li>
          ))}
          
          
        </ul>
      </main>
    </div>
  );
}

export default App;
