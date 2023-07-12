import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {} from '@mui/styled-engine-sc';
import {} from '@mui/icons-material';
import Navbar from "./Components/navbar";
import ListAppBar from "./Components/list";
import DetailComponent from "./Components/detail";
import { IntlProvider } from 'react-intl';

const App = () => {
  return(
    <IntlProvider locale="en"> 
    <Router>
      <div>
      <Navbar />
      <Routes>
        <Route path= "/" element={<ListAppBar/>}> </Route>
        <Route path= "/detail/:action/:userID" element={<DetailComponent/>}> </Route>
        <Route path= "/detail/:action" element={<DetailComponent/>}> </Route>
        </Routes>
        </div>
    </Router>
    </IntlProvider>
  )
}

export default App;