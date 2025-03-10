import { Provider } from 'react-redux'
import store from './store/store'
import './index.css'
import MainLayout from './components/MainLayout'

function App() {

  return (
    <>
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </>
  )
}

export default App