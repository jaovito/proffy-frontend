import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import logoutImg from '../../assets/images/icons/logout.svg'
import avatarImg from '../../assets/images/avatar.png'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHearthIcon from '../../assets/images/icons/purple-heart.svg'
import AuthContext from '../../contexts/auth'

import './styles.css'
import api from '../../services/api';

interface UsersInfo {
  id: number
  name: string
  subName: string
}

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0)
  const { user, signOut } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const response = await api.get('connections')
      const { total } = await response.data

      setTotalConnections(total)
      
    })()
  }, [])

  function handleSignOut() {
    signOut()
  }


  return (
      <div id="page-landing">
        
          <section className='first-content'>
            {!!user && user.map((userItem: UsersInfo)=> {
            return (
              <header className='header-info' key={userItem.id}>
                <section>
                  <img src={avatarImg} alt='Avatar'/>
                  <h2>{userItem.name}</h2>
                  <h2>{userItem.subName}</h2>
                </section>
                  <button onClick={handleSignOut}>
                    <img src={logoutImg} alt="Sair"/>
                  </button>
              </header>
            )
          })}
              
              <main>
              <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={landingImg} 
                  alt="Plataforma de estudos" 
                  className="hero-image"
                />

              </main>
                
          </section>

          <section className="second-container">
            <h1 className='buttons-description' >Seja bem vindo <br/><span>O que deseja fazer?</span></h1>
          <div className="buttons-container">
                  <Link to="/study" className="study">
                    <img src={studyIcon} alt="Estudar"/>
                    Estudar
                  </Link>

                  <Link to="/give-classes" className='give-classes'>
                    <img src={giveClassesIcon} alt="Dar aulas"/>
                    Dar aulas
                  </Link>
              </div>

              <span className="total-connections">
                  Total de {totalConnections} conexões já realizadas 
                  <img 
                    src={purpleHearthIcon} 
                    alt="Coração Roxo"
                    />
              </span>
          </section>
        
    </div>
  );
}

export default Landing;