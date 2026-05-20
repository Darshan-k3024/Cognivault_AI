import axios from "axios"
import { serverUrl } from "../App"
import { setUserData } from "../redux/userSlice"
export const getCurrUser = async (dispatch) => {
    try{
        const result = await axios.get(serverUrl + "/api/user/currentuser",{withCredentials:true})
        // console.log(result.data )
        dispatch(setUserData(result.data))
    }catch(error){
  console.log(error)
    }
}

export const genrateNotes=async (payload) => {
      try { 
        const result = await axiox.post(serverUrl +"api/notes/genrate-notes",payload,{withCredentials:true})
        console.log(result.data)
        return result.data

        
      } catch (error) {
         console.log(error)
      }
}

export const downloadPdf = async (payload) => {

    try {

        const responce = await axios.post(

            serverUrl + "/api/pdf/genrate-pdf",

            { result: payload },

            {
                withCredentials: true,
                responseType: "blob"
            }

        );

        const blob = new Blob(
            [responce.data],
            { type: "application/pdf" }
        );

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "ExamNotesAI.pdf";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.log(error);

    }

}