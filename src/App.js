
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CoinProvider } from './context/CoinContext';
import Home from './pages/Home';
import Detail from './pages/Detail';
import ScrollTopButton from './components/ScrollTopButton';


function App() {

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#EDF2F4",
      },
    },
  })


  return (
    <ChakraProvider theme={theme}>
      <CoinProvider>
        <Router>


          <Nav />

          <div className="main h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Routes>
          </div>

          <ScrollTopButton />
          <Footer />

        </Router>
      </CoinProvider>

    </ChakraProvider>


  );
}

export default App;
