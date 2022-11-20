import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveUser, saveRepos } from '../features/user/userSlice';
import DisplayUserData from './DisplayUserData';
import { Backdrop, CircularProgress } from '@mui/material';

function SearchUser() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        setUsername(e.target.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        getUserInfo();
    }
    const getUserInfo = () => {
        axios.get(`https://api.github.com/users/${username}`)
            .then(res => {
                dispatch(saveUser(res.data));
                return res.data.repos_url;
            })
            .then(url => {
                return axios.get(url+"?page=1&per_page=6")
            })
            .then(res => {
                dispatch(saveRepos(res.data));
                const link = res.headers.get('link');
                let start = link.split(',')[1].search("page=") + 5;
                let end = link.split(',')[1].search("&per_page");
                let lastPage = link.split(',')[1].slice(start, end);
                setPageCount(Number(lastPage));
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError(true);
            })
    }
  return (
    <div>
        <form onSubmit={onSubmitHandler} className="w-6/12 h-[50px] mx-auto my-[40px] relative rounded-lg overflow-hidden shadow-md">
            <input type="text" placeholder="Enter Username" value={username} onChange={onChangeHandler} className="w-full h-full pl-[40px] bg-[#f3f6f9] outline-0 text-lg"/>
            <SearchIcon onClick={getUserInfo} className="text-[#007FFF] cursor-pointer absolute left-[8px] top-[50%] transform translate-y-[-50%]"/>
        </form>
        <div>
            {loading ? (
                <Backdrop open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                error ? <div className="text-2xl px-[80px] cursor-default">user not found</div> : <DisplayUserData username={username} pageCount={pageCount}/>
            )}
        </div>
    </div>
  )
}

export default SearchUser