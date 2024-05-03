import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch.jsx";
import './Galeria.css'




export function Galeria() {

  const [ img , setImg] = useState([])
  const { VITE_API } = import.meta.env
  
  let photos = useFetch(VITE_API)

  useEffect(() => {

    const getPhotos = async (url) => {
            
      let controller = new AbortController()

      try {

           let options = { signal : controller.signal}
           let response = await fetch( url , options)
           let data = await response.json()
          return data

      } catch (error) {
          console.log(error)
      } finally{
          controller.abort()
      }

  }


  if(photos && Object.keys(photos).length > 0){
    const {photo} = photos.photos
    Promise.all(photo.map(each => {
      return getPhotos(`https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=748eec80f563a5f9d2b07dcd4931dbc9&photo_id=${each.id}&format=json&nojsoncallback=1`) 
    }))
    .then(photosInfo => {
      setImg(photosInfo)
    })
  }

  } , [photos])

  console.log(img)

  return (
    <>
      <h2>Flickr API:</h2>

      {img.length !== 0 &&
        <div className="filcker">
          <div className="filcker__wrapper">
          {img.map( (eachImg , index) => {
            return(
              <div key={eachImg.photo.id} className="filcker__container">
                <img src={`https://live.staticflickr.com/${eachImg.photo.server}/${eachImg.photo.id}_${eachImg.photo.secret}.jpg`} alt="" className="filcker__img"/>
              </div>
            )
          })}
          </div>
        </div>
      }
    </>
  );
}

  