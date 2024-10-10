import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AllRoutes from './routes/AllRoutes'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className="pt-20 md:pt-32"> {/* Add padding to account for fixed navbar */}
              <AllRoutes />
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
