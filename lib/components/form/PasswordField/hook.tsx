import { useState } from 'react'

export const usePasswordField = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const fieldType = showPassword ? 'text' : 'password'
  const textButton = showPassword ? 'ocultar' : 'mostrar'

  function changeVisibility() {
    setShowPassword((prevState) => !prevState)
  }

  return {
    fieldType,
    textButton,
    changeVisibility,
  }
}
