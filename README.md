# Text to Speech (Azure Cognitive Service)

Text to Speech API
By 
Sai Meghana Dulam

Documentation:

The API used here is Text to Speech API from Microsoft Azure Cognitive services.

1) Follow the following steps for the working of the API without JSON webtoken:
# Use the URL for the API: http://159.65.32.112:3000/api/v1/texttospeech
# Any text can be entered as input which will be passed and then the API returns an audio file of the entered text.

Example:
# In postman use the above API URL.
# Use request type POST.
# Click on ‘body’ and enable ‘JSON’ datatype.
# Enter JSON text with ‘text’ as parameter and any text as input value.
# Send the request.
# The API will analyze the text and returns an audio file which is the speech file of the entered text.

Body-Parameters:
{
"text": "This is the Final Project"
}


2) Follow the following steps for the working of the API with JSON webtoken:
# To generate a token, use the URL for the API: http://159.65.32.112:3000/api/v1/texttospeech/signIn.
# Pass the username and password as body parameters for the above request.

Body-Parameters:
{
"username":"meghana",
"password":"meghana"
}
 
# After request is sent, an access token is generated for the user.
# Use the URL for the API: http://159.65.32.112:3000/api/v1/user/texttospeech.
# Enter the Authorization parameter in the header with above generated token as input value.
# Also, enter the text parameter in the body and send the request.
# Once the request is sent, the API will analyze the text and generate an audio file of the text entered.

Body-Parameters:
{
"text": "This is the Final Project"
}
Header-Parameters:
Authorization: 'above generated token value'
