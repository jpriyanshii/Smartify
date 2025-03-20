import NewsFetch from './NewsFetch'

function News({parentstyles,childstyles}) {
  return (
    <div className={parentstyles} >
        <div className="items-start flex">
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
        </span>
        </div>
        <div>
        <p className="text-3xl flex text-white justify-center font-bold items-center mb-3">Trending News</p>
        <NewsFetch styles={childstyles}/>
    </div></div>
  )
}

export default News