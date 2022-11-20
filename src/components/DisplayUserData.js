import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useSelector} from 'react-redux'
import RepoCard from './RepoCard';
import Pagination from './Pagination';

function DisplayUserData({username, pageCount}) {
  const user = useSelector(state => state.user.userInfo);
  const repos = useSelector(state => state.user.userRepos);

  return (
    <>
      {
        user && repos ? (
          <>
            <div className="p-[80px] flex flex-row">
              <div className="flex flex-col items-center justify-center">
                  <div className="w-[160px] h-[160px] rounded-full overflow-hidden mb-[20px]">
                    <img src={user.avatar_url}/>
                  </div>
                  <h5><LinkIcon/> <a href={`${user.html_url}`} target="_blank" className="hover:border-b-2 border-black">{user.html_url}</a></h5>
              </div>
              <div className="pl-[80px] flex flex-col justify-end">
                  <h2 className="mb-[20px] text-4xl font-bold">{user.name ? user.name : user.login}</h2>
                  <p className="mb-[20px]">{user.bio}</p>
                  {user.location && <p className="mb-[20px]"><LocationOnIcon className="text-[#c92327]"/> {user.location}</p>}
                  {user.twitter_username && <p className="mb-[20px]"><TwitterIcon className="text-[#1c9cea]"/> <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" className="hover:border-b-2 border-black">https://twitter.com/{user.twitter_username}</a></p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 px-[80px]">
              {
                repos.map(repo => <RepoCard key={repo.id} title={repo.name} description={repo.description} url={repo.full_name} language={repo.language} />)
              }
            </div>
            <Pagination username={username} pageCount={pageCount}/>
          </>
        ) : (
          <div>
            
          </div>
        )
      }
    </>
  )
}

export default DisplayUserData