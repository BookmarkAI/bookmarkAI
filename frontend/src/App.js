import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './pages/HomeScreen';
import BrowseScreen from './pages/BrowseScreen';
import Layout from './pages/Layout';
import BrowseImages from './pages/BrowseImages';
import SearchResult from './pages/SearchResult';
import SourceList from './components/SourceList';
import { Desktop, Mobile } from './responsive/MediaQuery';
import MobileFoldersScreen from './components/Mobile/MobileFoldersScreen';
import MobileFolderView from "./components/Mobile/MobileFolderView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route element={<Layout/>}>
          <Route path="/browse" element={<BrowseScreen/>}/>
          <Route path="/images" element={<BrowseImages/>}/>
          <Route path="/search" element={<SearchResult/>}/>
          <Route path="/folders" element={<MobileFoldersScreen/>}/>
          <Route path="/folder/:id" element={<MobileFolderView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
