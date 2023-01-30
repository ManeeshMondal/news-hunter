import React from 'react'

const NewsItem=(props)=>{
      let {title,description,imageUrl,newsUrl,author,date,source}=props;
  return (
    <div className='my-3'>
      <div className="card mx-2 my-2" >
        <div className="con" style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
              <span className=" badge rounded-pill bg-danger" style={{left:'90%',zindex: '1'}}>{source}</span></div>
                <img src={!imageUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZRG3TRpimmvRySI5A8noTGvexfc27hlTHfA&usqp=CAU":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className=" text-danger">-by {author?author:'Unknown'} on {new Date(date).toGMTString()} </small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn btn-dark">Read More</a>
                </div>
                </div>
      </div>
    )
}

export default NewsItem
