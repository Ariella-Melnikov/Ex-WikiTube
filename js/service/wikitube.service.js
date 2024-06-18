"use strict"

const STORAGE_KEY_VIDEO = "videosDB"
const STORAGE_KEY_WIKI = "wikiDB"

const YOUTUBE_API_KEY = "AIzaSyBXbHajYFy9gw9cL7ASSR3yFaFwk9svCHg"

const CACHE_KEY = "youtubeCache"
const CACHE_EXPIRY = 2 * 60 * 60 * 1000

const DEFAULT_QUERY = "Britney Spears"




function getVideo(value) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=${value}`
return axios.get(url).then(res=>res.data)
}

function getData(value) {
  console.log('do you enter to getData?')
    const url = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${value}&format=json`
    console.log('dataurl', url)
return axios.get(url)
.then(res=>res.data)
.catch(error => {
    console.error('Error fetching Wikipedia data:', error);
})
}


  function loadDefaultData() {
    let videoItems
  
    // Fetch YouTube video data
    getVideo(DEFAULT_QUERY)
      .then((videos) => {
        videoItems = videos.items; // Save video items
        return getData(DEFAULT_QUERY); // Fetch Wikipedia data next
      })
      .then((wikiData) => {
        renderAll(videoItems, wikiData.query.search); // Render both videos and Wikipedia results
        saveToStorage(STORAGE_KEY_VIDEO, videoItems); // Save videos to storage
        saveToStorage(STORAGE_KEY_WIKI, wikiData.query.search); // Save Wikipedia results to storage
      })
      .catch((err) => {
        console.error("Error loading default data:", err);
        // Handle error or provide fallback behavior
      });
  }
  
// function loadDefaultVideos() {
//     getVideo(DEFAULT_QUERY)
//       .then((videos) => {
//         renderAll(videos.items)
//       })
//       .catch((err) => {
//         console.log("err:", err)
//       })
//   }