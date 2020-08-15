import React, { useContext } from 'react';
import Routes from './routes'
import AuthRoutes from './auth'
import AuthContext from '../contexts/auth';
import animationData from '../assets/lotties/loading.json'

import Lottie from 'react-lottie'

const IndexRoutes: React.FC = () => {
    const {signed, loading} = useContext(AuthContext)

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }
    

    if (loading) {
      return <Lottie options={defaultOptions} height={400} width={400}/>
    }

  return (
    signed ? <Routes /> : <AuthRoutes />
  )
}

export default IndexRoutes;