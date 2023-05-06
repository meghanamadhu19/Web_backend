const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {

    /*

       

        we can Navigate to different pages via different requests.
        if / then goto index.html
        if /about about then goto about.html
        if /api then laod the JSON file  /  ;) this might be something you need for your exam.



    */



    if (req.url === '/') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
            (err, content) => {

                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }

    else if (req.url === '/about') {


        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname, 'public', 'about.html'),
            (err, content) => {

                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }
    else if (req.url === '/api') {

        //https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
        const { MongoClient } = require('mongodb');


        async function main() {
            /**
             * Connection URI. Update sushmanth, Sush%401919, and <your-cluster-url> to reflect your cluster.
             * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
             */
            const uri = "mongodb+srv://meghanamadhu74:Meghana@cluster0.vfsbznp.mongodb.net/?retryWrites=true&w=majority";


            const client = new MongoClient(uri);


            try {
                // Connect to the MongoDB cluster
                await client.connect();

                // Make the appropriate DB calls
                //await  listDatabases(client);
                await findsomedata(client);

            } catch (e) {
                console.error(e);
            } finally {
                await client.close();
            }
        }

        main().catch(console.error);


        async function findsomedata(client) {
            const cursor = client.db("conv").collection("mongodb").find({});
            const results = await cursor.toArray();
            //console.log(results);
            const data = (JSON.stringify(results));
            console.log(data);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);

        };
        //run().catch(console.dir);

    }
    else {
        res.end("<h1> 404 nothing is here</h1>");
    }

    /*

        But what if we have  1000 pages/urls ? do we need to write 1000 if-else statements?

    /*/
});

const PORT = process.env.PORT || 5050;

server.listen(PORT, () => console.log(`Great our server is running on port ${PORT} `));
