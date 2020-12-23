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
const list=[];
db.collection("posts").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
var jso;
jso=doc.data();
jso.docid=doc.id;
       list.push(jso);
    });
app.get('/posts', (reqt, res) => {
var auth=admin.auth();
res.json(list);
});
});
app.get('/getuserpost', (reqt, res) => {
const data=[];
db.collection("posts").where("userid","==",reqt.query.userid).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
var jso;
jso=doc.data();
jso.docid=doc.id;
      data.push(jso);
    });
res.json(data);
});

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
