"use strict"

function onInit() {
  console.log("onInit")
  console.log("load video")

  getVideo()
    .then((video) => {
      console.log("video:", video)
      rendervideo(video)
    })
    .catch((err) => {
      console.log("err:", err)
      // showErrMessage(err)
    })
}

// function onLoadvideo() {
//   console.log("load video")
//   // getList()
//   //   .then(renderLists)
//   //   .catch((err) => {
//   //     console.log("Error loading list:", err)
//   //     // showErrMessage(err)
//   //   })
//   getVideo()
//   .then(video) =>{
//     console.log('video' , video)
//   }
//   .catch(err=>{
//     console.log('err:', err)
//     // showErrMessage(err)
// })
// }

function rendervideo(video) {
  const elVideoPlayer = document.querySelector(".video-player")

  if (!video) {
    elVideoPlayer.innerHTML = "<p>No video available</p>"
    return
  }

  const videoId = video.id.videoId
  const videoTitle = video.snippet.title
  const videoDescription = video.snippet.description
  const videoThumbnail = video.snippet.thumbnails.medium.url

  const iframeHTML = `
    <iframe width="420" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
  `

  elVideoPlayer.innerHTML = `
    <div class="video-details">
      <h2>${videoTitle}</h2>
      <p>${videoDescription}</p>
      <img src="${videoThumbnail}" alt="${videoTitle}" class="video-thumbnail">
    </div>
    ${iframeHTML}
  `
}
