"use strict"

const STORAGE_KEY_VIDEO = "videosDB"

const YOUTUBE_API_KEY = "AIzaSyBXbHajYFy9gw9cL7ASSR3yFaFwk9svCHg"
const VALUE = "beatles"

const CACHE_KEY = "youtubeCache"
const CACHE_EXPIRY = 2 * 60 * 60 * 1000

const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=${VALUE}`

function getVideo() {
  const video = loadFromStorage(STORAGE_KEY_VIDEO)

  if (video) {
    return Promise.resolve(video) // Resolve with cached video if available
  }
console.log('url', url)
  return axios.get(url)
    .then((res) => {
      const videoData = res.data.items[0] // Assuming you want the first video in the search results
      saveToStorage(STORAGE_KEY_VIDEO, videoData) // Save fetched video data to storage
      return videoData // Return the fetched video data
    })
    .catch((err) => {
      console.error("Error fetching video:", err)
      throw err // Propagate the error
    })
}
