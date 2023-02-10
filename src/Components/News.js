import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
// import { Route } from 'react-router-dom'; 

const News=(props)=>{
  // states 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)

  // function
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  
     const updateNews=async()=>{
      props.setProgress(10);
      // https://newsdata.io/api/1/news?apikey=pub_163195c438a7f05f2b7c4f5f93c8d95b6870d
      // const url = `https://newsdata.io/api/top-headlines?country=${props.country}&category=${props.category}&apiKey=pub_163195c438a7f05f2b7c4f5f93c8d95b6870d&page=${page}&pageSize=${props.pageSize}`;
      // const url = `https://newsdata.io/api/${page}/news?apikey=pub_163195c438a7f05f2b7c4f5f93c8d95b6870d&q=${props.category}`
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`; 
      setLoading(true);
      let data = await fetch(url);
      console.log(data)
      props.setProgress(30);
      let parsedData = await data.json()
      props.setProgress(70);
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      props.setProgress(100);
      
  }

 useEffect(() => {
  updateNews();
  document.title=`${capitalize(props.category)}-NewsHunter-Get your daily news and current arrairs about the world here for free`;
  //eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

   const fetchMoreData =async() => {
     setPage(page+1)
     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pagesize}`;
     let data = await fetch(url);
     let parsedData =await data.json()
     setArticles(articles.concat(parsedData.articles))
     setTotalResults(parsedData.totalResults)
    };
    //  button function 
    // handelprevclick=async ()=>{
    //   // console.log("prev") 
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eeb37f06fd334866af9f4388c1485849&page=${this.state.page-1}&pageSize=${props.pagesize}`;
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let parsedData =await data.json()
    //   console.log(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     page:this.state.page-1,
    //     loading:false
    //    })
    // }
    // handelNextclick=async ()=>{
    //   // console.log("next") 
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eeb37f06fd334866af9f4388c1485849&page=${this.state.page+1}&pageSize=${props.pagesize}`;
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let parsedData =await data.json()
    //   console.log(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     page:this.state.page+1,
    //     loading:false
    //    })
    // }
    return (
      <>
          <h1 className="text-center" style={{marginTop:"66px"}}>NewsHunter-Top {capitalize(props.category)} Headlines</h1>
          {loading&&<Spinner/>}
          <InfiniteScroll  style={{height: 'auto' ,overflow: 'hidden'}}
          dataLength={articles?.length}
          next={fetchMoreData}
          hasMore={articles?.length!==totalResults}
          loader={<Spinner/>}
         >
          <div className="container">
          <div className="row mb-5">
              {articles&&articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
              })}
              </div>
              </div>
              </InfiniteScroll> 
              {/* <div className="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handelprevclick}>&larr; Previous</button>
              <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/21)} className="btn btn-dark" onClick={this.handelNextclick}>Next &rarr;</button>
              </div> */}
              
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pagesize: '21',
  category: 'general'
}
News.propTypes = {
  country: propTypes.string,
  pagesize: propTypes.number,
  category: propTypes.string,
}
export default News

