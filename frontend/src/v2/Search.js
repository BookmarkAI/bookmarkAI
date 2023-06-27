import SearchBar from "./SearchBar";
import Box from '@mui/material/Box';
import { useState, useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import Bookmark from "./Bookmark";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export default function Search(props) {
    const [ searchResult, setSearchResult ] = useState([]);
    const [query, setQuery] = useState()
    const { user } = useContext(AuthContext);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/search` , {
            method: 'POST',
            body: JSON.stringify({ query: query, limit_chunks: 10, certainty: 0.9, alpha: 0 }),
            headers: {
                'X-UID': user.uid,
                'Content-Type': 'application/json'
            }
            });
            if (response.ok) {
            const data = await response.json();
            return data

            } else {
            throw new Error('Request failed');
            }
        } catch (error) {
            // Handle any errors
        }
    };

    async function getSearchResult() {
        fetchData().then(data => { 
            const updatedData = data.map(bookmark => {
                const type = bookmark.url.endsWith(".pdf") ? "pdf" : "url";
                return { ...bookmark, type };
            });
            setSearchResult(updatedData);
        });
    }

return(
    <>
    <SearchBar query={query} setQuery={setQuery} fetchData={fetchData} getSearchResult={getSearchResult}/>
    <Box sx={{height: '58%', overflow: "auto"}}>
        
        <Box sx={{height: '100%', p: 0.5}}>
        {searchResult.map((bookmark)=><Bookmark {...bookmark}/>)}
        </Box>
    </Box> 
    </>

)
}