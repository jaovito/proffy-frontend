import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from '../../assets/lotties/loading.json'
import backImg from '../../assets/images/icons/back.svg'

import './styles.css'

import logoIcon from '../../assets/images/logo.svg'
import eyeIcon from '../../assets/images/icons/eye.svg'
import eyeLineIcon from '../../assets/images/icons/eyeLinesvg.svg'
import api from '../../services/api';

const UserLogin: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [name, setName] = useState('')
    const [subName, setSubName] = useState("")
    const [passwordVisible, setPasswordVisible] = useState('password')
    const [loading, setLoading] = useState(false)

    const defaultOptions = {
    loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    const history = useHistory()

    function handlePassword() {
        if (passwordVisible === 'password') {
            setPasswordVisible('text')
        } else if (passwordVisible === 'text') {
            setPasswordVisible('password')
        }
    }

    function handleGoBack() {
        history.push('/')
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        await api.post('login', {
            name: name,
            subName: subName,
            email: inputValue,
            password: passwordValue,
        }).catch(err => {
            alert(`${err} \n Erro ao se cadastrar, verifique seus dados.`)
        })

        setLoading(false)
        history.push('/success')
    }



  return (
      <div className='create-user'>

      
        <main className='form-login' >
            <header>
                <button onClick={handleGoBack} className='goBack'>
                    <img src={backImg} alt="Voltar"/>
                </button>
            </header>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Cadastro</legend>
                    <p>Preencha os dados abaixo
                    para começar.</p>
                    <input value={name} onChange={e => setName(e.target.value)} className='email-input' type="text" name="name" id="name" placeholder='Nome'/>
                    <section>
                        <input value={subName} onChange={e => setSubName(e.target.value)} type='text' name="subName" id="subName" placeholder='Sobrenome'  />
                        <button className='eye-button' type='button' onClick={handlePassword}>
                        </button>
                    </section>
                    <input value={inputValue} onChange={e => setInputValue(e.target.value)} className='email-input' type="text" name="email" id="email" placeholder='E-mail'/>
                    <section>
                        <input value={passwordValue} onChange={e => setPasswordValue(e.target.value)} type={passwordVisible} name="password" id="password" placeholder='Senha'  />
                        <button className='eye-button' type='button' onClick={handlePassword}>
                            {passwordVisible === 'password' ? <img className='eye-icon' src={eyeIcon} alt="Ocultar senha"/> : <img src={eyeLineIcon} className='eye-icon' alt="Ocultar senha"/>}
                        </button>
                    </section>
                </fieldset>

                <button className='button-submit' type='submit' disabled={loading === true} > Concluir cadastro </button>
            </form>

        </main>

        <div  className="bd-container"  >
            <img src={logoIcon} alt="Proffy"/>
        </div>

        {!!loading ? <div className="loading">
            <Lottie options={defaultOptions} height={400} width={400} />
        </div> : null}

      </div>
  );
}

export default UserLogin;