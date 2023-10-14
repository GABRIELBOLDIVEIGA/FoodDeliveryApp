/* eslint-disable @typescript-eslint/no-explicit-any */

import { deliveryInstance } from 'src/services/deliveryInstance';
import { useState } from 'react';

const useAuth = () => {
  const [response, setResponse] = useState<any>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  const login = async (data: { email: string, password: string }) => {
    setLoading(true)
    deliveryInstance.post("http://localhost:3000/auth/login", { ...data })
      .then((res) => { setResponse(res.data) })
      .catch((err) => { setError(err) })
      .finally(() => { setLoading(false) })

    return true;
  }

  return { loading, error, response, login }
}

export default useAuth