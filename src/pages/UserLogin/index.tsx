import React, { useState, useContext, FormEvent } from 'react';
import {Link} from 'react-router-dom'
import AuthContext from '../../contexts/auth'
import animationData from '../../assets/lotties/loading.json'
import Lottie from 'react-lottie'

import './styles.css'

import logoIcon from '../../assets/images/logo.svg'
import eyeIcon from '../../assets/images/icons/eye.svg'
import eyeLineIcon from '../../assets/images/icons/eyeLinesvg.svg'

const UserLogin: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState('password')
    const [inputValue, setInputValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [loading, setLoading] = useState(false)

    const { signIn } = useContext(AuthContext)

    const defaultOptions = {
        loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
          }
        }
    

    function handlePassword() {
        if (passwordVisible === 'password') {
            setPasswordVisible('text')
        } else if (passwordVisible === 'text') {
            setPasswordVisible('password')
        }
    }

    async function handleSignIn(e: FormEvent) {
        e.preventDefault()
        setLoading(true)

        await signIn(inputValue, passwordValue).catch(err => {
            alert(`${err}. \n Cadastro não entcontrado!`)
        })

    }



  return (
      <div className='login-container'>

        <div  className="bd-container"  >
            <img src={logoIcon} alt="Proffy"/>
        </div>

        <main className='form-login' >
            <form onSubmit={handleSignIn}>
                <fieldset>
                    <legend>Fazer login</legend>
                    <input value={inputValue} onChange={e => setInputValue(e.target.value)} className='email-input' type="text" name="email" id="email" placeholder='E-mail'/>
                    <section>
                        <input value={passwordValue} onChange={e => setPasswordValue(e.target.value)} type={passwordVisible} name="password" id="password" placeholder='Senha'  />
                        <button className='eye-button' type='button' onClick={handlePassword}>
                            {passwordVisible === 'password' ? <img className='eye-icon' src={eyeIcon} alt="Ocultar senha"/> : <img src={eyeLineIcon} alt="Ocultar senha"/>}
                        </button>
                    </section>
                </fieldset>

                <button className='button-submit' type='submit' disabled={loading === true} > Entrar </button>
            </form>

            <footer>
                <p className='user-redirect'>Não tem conta? <span className="redirect"><Link to='/new-user'>Cadastrar-se</Link></span></p>

                <span>É de graça</span>
            </footer>
        </main>

        {!!loading ? <div className="loading">
            <Lottie options={defaultOptions} height={400} width={400} />
        </div> : null}
      </div>
  );
}

export default UserLogin;