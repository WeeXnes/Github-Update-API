const fetch = require('node-fetch')

let github_url = "https://api.github.com/repos/weexnes/weexnessuite/releases/latest"
var access_token = ""
let myHeaders = {
    "Authorization":"Basic " + access_token + ":x-oauth-basic",
    "User-Agent":"lk-github-client"
};


const express = require('express')
const app = express()

app.get('/*', function (req, res) {

    fetch(github_url, {
        method: 'GET',
        headers: myHeaders
    }).then(res => res.json())
        .then(json => {
            //console.log(json)
            let download_url = json.assets[0].browser_download_url;
            let tag_name = json.tag_name;
            let name = json.name;
            let description = json.body;
            let jsonStr = `{
                "download_url": "${download_url}",
                "tag_name": "${tag_name}",
                "name": "${name}",
                "description": "${description}"
            }`;
            let jsonObj = JSON.parse(jsonStr);
            res.send(jsonObj)
        })
        .catch(err => console.log(err));
})

app.listen(5169)




