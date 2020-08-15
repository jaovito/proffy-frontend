import React from 'react';

import successIcon from '../../assets/images/icons/success-check-icon.svg'
import './styles.css';
import { useHistory } from 'react-router-dom';

const SuccessCreate: React.FC = () => {
    const history = useHistory()

    function handleGoBack() {
        history.push('/')
    }

  return (
      <main id='page-success'>
          <img src={successIcon} alt=""/>
          <h1>Cadastro Concluído</h1>
          <p>Agora você faz parte da plataforma Proffy.</p>
          <p>Tenha uma ótima experiência.</p>

          <button type='button' onClick={handleGoBack} >Fazer login</button>
      </main>
  );
}

export default SuccessCreate;