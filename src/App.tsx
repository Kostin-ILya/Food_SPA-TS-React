import { Button } from 'components/UI/Button'
import './App.css'
import { Input } from 'components/UI/Input'

const App = () => {
  return (
    <div className="app">
      <h1>App</h1>
      <Button>Click Me!</Button>
      <Button appearance="big">Click Me!</Button>
      <Input placeholder="Пароль" name="password">
        Ваш пароль
      </Input>
    </div>
  )
}

export default App
