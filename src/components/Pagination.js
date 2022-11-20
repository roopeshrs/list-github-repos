import React from 'react'
import ReactPaginate from 'react-paginate'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveRepos } from '../features/user/userSlice';

function Pagination({username, pageCount}) {
  const dispatch = useDispatch();

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    axios.get(`https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=6`)
    .then(res => {
      dispatch(saveRepos(res.data));
    })
  }

  return (
    <div>
        <ReactPaginate 
            previousLabel={<SkipPreviousIcon />}
            nextLabel={<SkipNextIcon />}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={3}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={`flex flex-row justify-center mt-[50px] mb-[100px]`}
            pageClassName={`shadow-md w-[40px] h-[40px] flex justify-center items-center`}
            pageLinkClassName={`w-full h-full flex justify-center items-center text-[#1976d2] font-semibold`}
            previousClassName={`shadow-md w-[40px] h-[40px] flex justify-center items-center`}
            previousLinkClassName={`w-full h-full flex justify-center items-center text-[#1976d2] font-semibold`}
            nextClassName={`shadow-md w-[40px] h-[40px] flex justify-center items-center`}
            nextLinkClassName={`w-full h-full flex justify-center items-center text-[#1976d2] font-semibold`}
            breakClassName={`shadow-md w-[40px] h-[40px] flex justify-center items-center`}
            breakLinkClassName={`w-full h-full flex justify-center items-center text-[#1976d2] font-semibold`}
            activeClassName={`bg-[#1976d2]`}
            activeLinkClassName={`text-[#fff]`}
        />
    </div>
  )
}

export default Pagination