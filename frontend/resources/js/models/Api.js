import Axios from 'axios';

export default () => {
    return Axios.create({
        baseURL: 'https://programmeren-api.herokuapp.com/',
        headers:{
            'Accept': 'application/json'
        }
    })
}