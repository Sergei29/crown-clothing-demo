const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

// bringing stripe library( after .env - as we need the STRIPE_SECRET_KEY):
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000; // when we deploy on heroku - it sets PORT env variable for us.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
	//serve our react app all static files in build/ directory:
	app.use(express.static(path.join(__dirname, "client/build")));

	//for every/all incoming get requests: serve react app index.html
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

app.listen(port, (error) => {
	if (error) throw error;
	console.log(`server running on http://localhost:${port}`);
});

// for incoming request from react-app to '/payment' endpoint:
app.post("/payment", (req, res) => {
	const body = {
		source: req.body.token.id,
		amount: req.body.amount,
		currency: "usd",
	};

	// create, send to stripe the charge object. as callback - will receive either error or stripe charge confirm -
	// that will use to respond back to the client react-app using the `res` object:
	stripe.charges.create(body, (stripeErr, stripeRes) => {
		if (stripeErr) {
			res.status(500).send({ error: stripeErr });
		} else {
			res.status(200).send({ success: stripeRes });
		}
	});
});
