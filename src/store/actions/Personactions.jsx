export {removeperson} from '../reducers/personslice'
import { loadperson } from '../reducers/personslice'
import axios from '../../utils/axios'

export const asyncloadperson=(id)=>async(dispatch,getstate)=>{
    try {
       const detail=await axios.get(`/person/${id}`) 
       const externalid=await axios.get(`/person/${id}/external_ids`) 
       const combinecredits=await axios.get(`/person/${id}/combined_credits`) 
       const tvcredits=await axios.get(`/person/${id}/tv_credits`) 
       const moviecredits=await axios.get(`/person/${id}/movie_credits`) 
       
       let theultimatedetails={
        detail:detail.data,
        externalid:externalid.data,
        combinecredits:combinecredits.data,
        tvcredits:tvcredits.data,
        moviecredits:moviecredits.data 
       };
       dispatch(loadperson(theultimatedetails))
       
    } catch (error) {
        console.log(error)
    }
}