const firebaseConfig = {

apiKey: "APIKEY",
authDomain: "PROJECT.firebaseapp.com",
databaseURL: "https://PROJECT-default-rtdb.firebaseio.com",
projectId: "PROJECT",

};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()
