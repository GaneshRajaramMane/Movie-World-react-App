export {removemovie} from '../reducers/movieslice'
import { loadmovie } from '../reducers/movieslice'
import axios from '../../utils/axios'

export const asyncloadmovie=(id)=>async(dispatch,getstate)=>{
    try {
       const detail=await axios.get(`/movie/${id}`) 
       const externalid=await axios.get(`/movie/${id}/external_ids`) 
       const recommendations=await axios.get(`/movie/${id}/recommendations`) 
       const similar=await axios.get(`/movie/${id}/similar`) 
       const videos=await axios.get(`/movie/${id}/videos`) 
       const translation=await axios.get(`/movie/${id}/translations`)
       const watchproviders=await axios.get(`/movie/${id}/watch/providers`) 
       let theultimatedetails={
        detail:detail.data,
        externalid:externalid.data,
        recommendations:recommendations.data.results,
        similar:similar.data.results,
        videos:videos.data.results.find((m)=>m.type==="Trailer"),
        watchproviders:watchproviders.data.results.IN,
        translation:translation.data.translations.map((t)=>t.english_name)
       };
       dispatch(loadmovie(theultimatedetails))
       
    } catch (error) {
        console.log(error)
    }
}