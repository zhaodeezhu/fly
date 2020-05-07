import axios from '../plugins/axios'

export const getNoteDataInterface = async () => {
  return await axios.get('/fly/note/getData');
}