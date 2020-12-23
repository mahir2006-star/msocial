var admin=require("firebase-admin");
var serviceAccount = require("./mavls-social-firebase-adminsdk-q2pvh-f8a52f8f05.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mavls-social.firebaseio.com"
});
var db=admin.firestore();

const express = require('express')
const app = express()
const port =process.env.PORT || 8080
var cors = require('cors')
app.use(cors());

app.get('/posts', (reqt, res) => {
  admin
  .auth()
  .getUser(reqt.query.userid)
  .then((userRecord) => {
  const list=[];
db.collection("posts").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
var jso;
jso=doc.data();
jso.docid=doc.id;
       list.push(jso);
    });
  })
  .catch((error) => {
   res.send("error occured");
  });
});
app.get('/getuserpost', (reqt, res) => {
const data=[];
   admin
  .auth()
  .getUser(reqt.query.userid)
  .then((userRecord) => {
   db.collection("posts").where("userid","==",reqt.query.userid).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
var jso;
jso=doc.data();
jso.docid=doc.id;
      data.push(jso);
    });
res.json(data);
});
  })
  .catch((error) => {
    res.send("error occured");
  });

});


});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
