// Requires request and request-promise for HTTP requests
// e.g. npm install request request-promise
const rp = require('request-promise');
// Requires fs to write synthesized speech to a file
const fs = require('fs');
// Requires readline-sync to read command line inputs
//const readline = require('readline-sync');
// Requires xmlbuilder to build the SSML body
const xmlbuilder = require('xmlbuilder');
const request = require('request');
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var jwt   = require('jsonwebtoken');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// const verifyToken = function(req,res,next){//verifying the token obtained from the user.

//     var headerVal = req.headers['authorization'];
//     var token = headerVal.split(' ')[1];
//     if(token === null) return res.sendStatus(404);

//     jwt.verify(token,'myKey',function(err,req,res){
//         if(err) return res.sendStatus(404);
//         next();
//     })

// }

/**
* @swagger
* /api/v1/texttospeech:
*   post:
*     description: convert text input to speech file
*     parameters:
 *       - name: text
 *         in: formData
 *         type: string
 *         required: true     
*     responses:
*       '200':
*         description: OK
*/

router.post('/',urlencodedParser, async function(req, res){

    if(req.body){
        if(req.body.text){
            const text = req.body.text;
            const subscriptionKey = process.env.MY_API_KEY_TTS;
            try {
                const accessToken = await getAccessToken(subscriptionKey);
               var request = await textToSpeech(accessToken, text);
              res.download('./TTSOutput.wav');  
                
            } catch (err) {
                console.log(`Something went wrong: ${err}`);
            }
        }
    }
    else{

    }

});

// Gets an access token.
function getAccessToken(subscriptionKey) {
    let options = {
        method: 'POST',
        uri: process.env.MY_API_END_POINT,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    }
    return rp(options);
}

// Make sure to update User-Agent with the name of your resource.
// You can also change the voice and output formats. See:
// https://docs.microsoft.com/azure/cognitive-services/speech-service/language-support#text-to-speech
function textToSpeech(accessToken, text) {
    // Create the SSML request.
    let xml_body = xmlbuilder.create('speak')
        .att('version', '1.0')
        .att('xml:lang', 'en-us')
        .ele('voice')
        .att('xml:lang', 'en-us')
        .att('name', 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)')
        .txt(text)
        .end();
    // Convert the XML into a string to send in the TTS request.
    let body = xml_body.toString();

    let options = {
        method: 'POST',
        baseUrl: 'https://eastus.tts.speech.microsoft.com/',
        url: 'cognitiveservices/v1',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'User-Agent': 'TexttoSpeech6177',
            'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
            'Content-Type': 'application/ssml+xml'
        },
        body: body
    }

    let request = rp(options)
        .on('response', (response) => {
            if (response.statusCode === 200) {
               request.pipe(fs.createWriteStream('TTSOutput.wav'));
                console.log('\nYour file is ready.\n')
            }
        });
    return request;
}



module.exports= router;
