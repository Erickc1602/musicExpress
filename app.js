const express = require('express');
const albums = require('./albums');
const app = express();
const port= 5000;

const db = require ('./albums')

//Main page
app.get('/', (req, res) => {
    let htmlFront = `<body style="background-color: black; color: antiquewhite; font-family: sans-serif;">
    <h1 style=" font-size: 80px; ">DJ Alok</h1>
    <img src="https://sitecoreaudioprod.umusicpub.com/sitecore_media/70ABBD29-FA2D-4980-90B1-F7CE2E0E0697.jpg" height="500px" >
    <h3 style="font-size: 25px;">Alok Achkar Peres Petrillo is a Brazilian musician, DJ, and record producer. He is known for his single "Hear Me Now". In 2021, Alok was ranked the 4th best DJ in the world by DJ Mag, being the highest position occupied by a Brazilian.</h3>
    <a href= "/albums" ><button style="width: 300px; height: 40px; font-family: sans-serif; font-size: 25px; background-color:antiquewhite ;background-size: cover; color: black; font-style: inherit; border: 4px solid antiquewhite; border-radius: 10px;  margin-top: 20px; "> Albums</button> </a>
    `



    res.send(htmlFront)
})

// Albums page

app.get('/albums', (req, res) => {

    let htmlString = ' <h1 style="font-family: sans-serif; font-size: 70px; margin-left: 30px; ">Albums: </h1><body style="background-image: url(https://media2.miaminewtimes.com/mia/imager/u/magnum/9072374/_igp5968.jpg?cb=1642614972); background-color: rgb(0, 0, 0); background-repeat: no-repeat; color: black;"> ';
    htmlString += `<ul>`;
    db.map(album => {
    htmlString += `
    <div  style="font-family: sans-serif; font-size: 60px; margin-top: 220px;">
    <a href="/albums/${album.publishDate}">${album.album}</a>
    
    </div>
    `
}) 
htmlString +=` <a href= "/" ><button style="width: 300px; height: 40px; font-family: sans-serif; font-size: 25px; background-color:antiquewhite ;background-size: cover; color: black; font-style: inherit; border: 4px solid antiquewhite; border-radius: 10px; margin-top: 270px; "> Main Page</button> </a></ul> </body>`

res.send(htmlString)

})

// Album Page

app.get('/albums/:publishDate', (req, res) =>{
const {publishDate} = req.params
const album = db.find(cd => cd.publishDate === publishDate);
if(album){
    let htmlData = '<body style="background-color: black; color: antiquewhite;"> ';
    htmlData += `<h1 style="font-family: monospace; font-size: 70px;"> ${album.album}</h1>`;
    htmlData += `<h3 style="font-family: monospace; font-size: 30px;">Publish Date: ${album.publishDate}</h3>`;
    htmlData += `<img src="${album.imgURL}" style="height: 650px; width: 550px; max-width: 100%;">`;
    htmlData += `<h3 style="font-family: monospace; font-size: 30px;">Songs: ${album.songTitles}</h3>`;
    htmlData += `<a href= "/albums" ><button style="width: 300px; height: 40px; font-family: sans-serif; font-size: 25px; background-color:" antiquewhite";background-size: cover; color: black; font-style: inherit; border: 4px solid antiquewhite; border-radius: 10px;  "> Albums</button> </a> </body>`
    
    res.send(htmlData)
 }else{
    res.send(`Sorry, no albums made in the year ${publishDate}`)
}



})




app.listen(port, () => {
    console.log (`Yo. Listening at http://localhost:${port}`);

})