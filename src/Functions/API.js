import axios from 'axios';
import moment from 'moment';

export const getMessages = (requestType) => {
    const token='MhIK2k2oKcfE'
    let url=`/?token=${token}`
    if(requestType !== 'all') {
        const timestampSince = moment().unix();
        url = `/?since=${timestampSince}&limit=10&token=${token}`;
    };
    axios.get(url)
        .then( response => {
            const messages = response.data.map( message => {
                return {
                    username: message.author,
                    message:  message.message,
                    timestamp: message.timestamp,
                    id: message._id
                }
            });   
        })
        .catch(error => {console.log(error)})
}

export const postMessage = (newMessage, author) => {
    axios({
        url: '/',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'token': 'MhIK2k2oKcfE'},
        data: {
            'message': newMessage,
            'author' : author
        } 
    })
        .then( response => {
            const message = response.data;
            return {
                username: message.author,
                messageText: message.message,
                timestamp: message.timestamp,
                id: message._id
            }
        })
        .catch(error => {console.log(error)});
    }