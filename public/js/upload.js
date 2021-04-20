// const imageDataHandler = async (event) => {
//     event.preventDefault();

//     const filename = document.querySelector(".upload-form");

//     if (filename) {
//         const response = await fetch("/upload", {
//             method: "POST",
//             body: JSON.stringify({ filename }),
//             headers: { "Content-Type": "application/json" },
//         });

//         if (response.ok) {
//             document.location.replace("/");
//         } else {
//             alert("Upload failed.");
//         }
//     }
// };

// document
//     .querySelector(".css-anf0i3")
//     .addEventListener("submit", imageDataHandler);

// getEXIF();

// document.querySelector('#pickUpFile').addEventListener("change", getEXIF());

// function getEXIF() {
//     console.log('function!');
//     try {
//         let result = cloudinary.uploader.upload('./public/assets/images/IMG_5062.jpg', { type: "upload", image_metadata: true },
//             function (error, result) {

//                 if (result) {
//                     let latitude = result.image_metadata.GPSLatitude;
//                     let longitude = result.image_metadata.GPSLongitude;
//                     let url = result.url;
//                     let secure_url = result.url;
//                     let date_created = result.image_metadata.DigitalCreationDate;

//                     let dateBits = date_created.split(/[^\d\w\.]+/);
//                     let showDate = (dateBits[1] + '/' + dateBits[2] + '/' + dateBits[0]);

//                     let latBits = latitude.split(/[^\d\w\.]+/);
//                     let lat = [latBits[0], latBits[2], latBits[3], latBits[4]];

//                     let superLat1 = parseFloat(latBits[0]);
//                     let superLat2 = parseFloat(latBits[2] / 60);
//                     let superLat3 = parseFloat(latBits[3] / 3600);
//                     let superLat = (superLat1 + superLat2 + superLat3).toFixed(6);

//                     if (latBits[4] == "S") {
//                         latBits[0] = latBits[0] * -1
//                     };

//                     let longBits = longitude.split(/[^\d\w\.]+/);
//                     let long = [longBits[0], longBits[2], longBits[3], longBits[4]];

//                     let superLong1 = parseFloat(longBits[0]);
//                     let superLong2 = parseFloat(longBits[2] / 60);
//                     let superLong3 = parseFloat(longBits[3] / 3600);
//                     let superLong = (superLong1 + superLong2 + superLong3).toFixed(6);

//                     if (longBits[4] == "W") {
//                         superLong = superLong * -1;
//                     };

//                     console.log('date: ' + showDate);
//                     console.log('latitude: ' + superLat);
//                     console.log('longitude: ' + superLong);
//                     console.log('secure url: ' + secure_url);

//                     // console.log(result);
//                 };
//             });
//     } catch (err) {
//         console.log(err);
//     };
// };

//--------------------------------------------------------------------------------------//
// router.post('/', (req, res) =>
//     Post.create(req.body)
//         .then((newPost) => {
//             res.json(newPost);
//         })
//         .catch((err) => {
//             res.json(err);
//         })
//     );
//--------------------------------------------------------------------------------------//
//   const filename = document.querySelector('#fileName').value.trim();
//              rough sketch of query to get the name of the file to be uploaded

// export the getEXIF function to be used in home-routes.js

// module.exports = getEXIF;


const showWidget = async (event) => {
    let widget = window.cloudinary.createUploadWidget(
        {
            cloudName: 'fung-id',
            uploadPreset: 'cdg9mwym',
            sources: ["local", "camera"]
        },
        (error, result) => {
            if (widget) {

                const latitude = result.image_metadata.GPSLatitude;
                const longitude = result.image_metadata.GPSLongitude;
                const url = result.url;

                const response = await fetch('/upload', {
                    method: 'POST',
                    body: JSON.stringify({ latitude, longitude, url }),
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    document.location.replace('/mush-room');
                } else {
                    alert('Failed to upload image.');
                }
            }
          }
    );
    widget.open();


// showWidget = () => {
//   let widget = window.cloudinary.createUploadWidget(
//     {
//       cloudName: "fung-id",
//       uploadPreset: "cdg9mwym",
//       sources: ["local", "camera"],
//     },
//     (error, result) => {
//       console.log(result);
//       const latitude = result.image_metadata.GPSLatitude;
//       const longitude = result.image_metadata.GPSLongitude;
//       const url = result.url;

//       fetch("/users/upload", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ latitude, longitude, url }),
//       });
//     }
//   );
//   widget.open();
// };

// showWidget()
