import React from 'react'

function RepoCard({title, description, url, language}) {
  return (
    <div className="bg-[#e7ebf0] shadow-lg p-[10px]">
      <h2 className="text-2xl mb-[20px]"><a href={`https://github.com/${url}`} target="_blank" className="hover:border-b-2 border-black">{title}</a></h2>
      {description && <p className="mb-[20px]">{description}</p>}
      {language && <div className="bg-[#1976d2] text-white font-semibold p-[8px] rounded-lg w-fit cursor-default text-sm">{language}</div>}
    </div>
  )
}

export default RepoCard