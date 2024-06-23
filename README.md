Please note that the current setup will not function correctly until the api folder is placed within the src folder of the frontend. 
Please check and ensure all required modules are installed.

The API calls have been thoroughly tested and are working properly. I used Postman to verify all GET, PUT, and POST calls, receiving a status code of 200 for each. 
Additionally, once the server is running on port 5000, you can visit the specific localhost port to view the database entries.

The backend itself is operational. To run it, navigate to your terminal:

cd src
node app.js

You will see an output indicating "Server is running on port 5000."

However, there's an issue with integration with the frontend.
When attempting to add an icon, a prompt appears asking for a device name. After entering the name, the console displays that device data is being sent to the server. 
Unfortunately, the server does not send an acknowledgment back to the frontend.

Furthermore, there are unresolved React Konva (JavaScript library used for drawing complex 2D shapes and animations on HTML5 Canvas) warnings. 
Due to the device not being created, it is not displayed in the frontend.



