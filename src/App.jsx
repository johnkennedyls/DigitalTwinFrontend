import './App.css'
import TimeSeries from './components/graphics/TimeSeries'
import MainLayout from './layouts/main/MainLayout'

function App() {

  return (
    <MainLayout>
      <div style={{maxWidth:'80%', margin:'auto'}}>
        <TimeSeries/>
      </div>
      
    </MainLayout>
  )
}

export default App
