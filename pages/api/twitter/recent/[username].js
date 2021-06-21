require('dotenv').config()
const Fetch = require("node-fetch");
const Twitter = require('twitter');
const FormData = require("form-data");

const UploadFile = async (props) => {
    const response = await Fetch(props.url);
    const buffer = await response.buffer();
    const url = `https://uploads.slate.host/api/public/${props.collection}`;

    let data = new FormData();
    data.append("data", buffer, { filename: `${props.screen_name}-twitter.jpeg` });
    const upload = await Fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${props.api}`,
        },
        body: data
    });

    const json = await upload.json();

    let fileMeta = json.data;
    let time_stamp = props.created_at.split('+')[0];

    fileMeta.data = {
        source: props.source,
        name: `${props.screen_name} - ${time_stamp}`
    };

    const responseMeta = await Fetch('https://slate.host/api/v2/update-file', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${props.api}`,
        },
        body: JSON.stringify({ data: fileMeta }),
    });
    
    return fileMeta;
};

export default function handler(req, res) {

    const { query: { username, api, collection }} = req;

    var client = new Twitter({
        consumer_key: process.env.TWITTER_API,
        consumer_secret: process.env.TWITTER_SECRET,
        bearer_token: process.env.TWITTER_BEARER
    });

    if (!username) {
        return res.status(200).json({ error: 'No username provided' })
    }

    if (!api) {
        return res.status(200).json({ error: 'No api key provided' })    
    }

    if (!collection) {
        return res.status(200).json({ error: 'No collection id provided' })        
    }

    client.get('statuses/user_timeline', { screen_name: username, count: 1 }, async (error, tweets, response) => {
        if (error) throw error;

        if (!tweets[0].entities.media) {
            return res.status(200).json({ error: 'No media in recent tweet' })
        }

        let upload = await UploadFile({
            url: tweets[0].entities.media[0].media_url_https,
            source: tweets[0].text,
            created_at: tweets[0].created_at,
            screen_name: tweets[0].user.name,
            api: api,
            collection: collection
        });

        return res.status(200).json({ status: 'Done upload', data: upload })
    });

}