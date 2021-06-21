require('dotenv').config()
const Fetch = require("node-fetch");
const FormData = require("form-data");
const Flickr = require('flickr-sdk');

const UploadFile = async (props) => {
	console.log('props', props)
    const response = await Fetch(props.url);
    const buffer = await response.buffer();
    const url = `https://uploads.slate.host/api/public/${props.collection}`;

    let data = new FormData();
    data.append("data", buffer, { filename: `${props.screen_name}-flickr.jpeg` });
    const upload = await Fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${props.api}`,
        },
        body: data
    });

    const json = await upload.json();

    let fileMeta = json.data;
    let profileLink = `https://flickr.com/photos/${props.path}`;
    

    fileMeta.data = {
        source: props.source,
        name: `${props.screen_name} - Taken: ${props.created_at}`,
        body: props.description,
        author: profileLink
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

	const { query: { ids, api, collection }} = req;

	const idArr = ids.split(',');
	const randomId = idArr[Math.floor(Math.random()* idArr.length)];

	const flickr = new Flickr('9ce09b32368da91bdaafcf9c706f1d19');

	flickr.galleries.getPhotos({ gallery_id: randomId }).then(async (main) => {

		const num = main.body.photos.total - 1;
		const rndInt = Math.floor(Math.random() * num);

		const photoId = main.body.photos.photo[rndInt].id;
		const photoTitle = main.body.photos.photo[rndInt].title;

		flickr.photos.getInfo({ photo_id: photoId }).then(async (photoData) => {
			const data = photoData.body;

			flickr.photos.getSizes({ photo_id: photoData.body.photo.id }).then(async (photo) => {
			  let allPhotoSizes = photo.body.sizes.size;

			  const imageSize = allPhotoSizes.filter(photo => photo.label == 'Original' || photo.label == 'Large');

			  if(!imageSize) {
			  	return res.status(200).json({ error: 'No image file found' })
			  }

			  const description = data.photo.title._content + data.photo.description._content;
			  const photoUrl = imageSize[0].source;
			
			  let upload = await UploadFile({
			  	url: photoUrl,
		        source: data.photo.urls.url[0]._content,
		        created_at: data.photo.dates.taken,
		        screen_name: data.photo.owner.username,
		        path: data.photo.owner.nsid,
		        description: description,
		        api: api,
		        collection: collection,
			  })
			  

			  return res.status(200).json({ data: upload })

			});
		});	
	});
}