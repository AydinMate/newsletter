const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))


// Home page
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = "https://us10.api.mailchimp.com/3.0/lists/4b484948be"

    const options = {
        method: "POST",
        auth: "aydin1:bf0c00dc77a8efdcfbf0c1ec81bd1fee-us10"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
    }
        else {
                res.sendFile(__dirname + "/failure.html")
    }

        response.on("data", function(data) {
            console.log(JSON.parse(data))
        });
    });



    request.write(jsonData);
    request.end();
});





app.post("/failure", function(req, res) {
    res.redirect("/");
})







const port = process.env.port || 3000;

app.listen(port, function() {
    console.log("Server is running on port 3000")
});

// api key
// bf0c00dc77a8efdcfbf0c1ec81bd1fee-us10

// List id
// 4b484948be