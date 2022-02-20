<div id="top"></div>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#running-the-project">Running the project</a></li>
        <li><a href="#running-the-tests">Running the tests</a></li>
      </ul>
    </li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

</br>

<!-- ABOUT THE PROJECT -->
## About The Project

It's a Node.JS based application that uses the following technologies: 

* Typescript: v4.5.5
* Docker: v20.10.8
* Docker Compose: v2.0.0
* Node.JS: latest
* TSLint: v6.1.3
* Mongoose: v6.2.2 
* Express: v4.17.3
* AJV: v8.10.0

It containerized project packages on top of a public NodeJS Docker-base-image. Docker copmose file uses the official MongoDB docker image. 


<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Node.js](https://nodejs.org/)
* [Typescript](http://typescript.org/)
* [AJV](https://www.npmjs.com/package/ajv)
* [Tslint](https://www.npmjs.com/package/tslint)
* [Docker](https://www.docker.com/)
* [Mongodb](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

Instructions on setting up the project locally.
To get a local copy up and running follow these steps.

### Running the project

1. Clone the repo
   ```sh
   git clone https://github.com/peyman-mashhadi/peyman-mashhadi-cognigy-challenge.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the server
   ```sh
   npm run start
   ```
4. Local server will be run on:
   ```
    http://localhost:4000
   ```
5. Set `x-api-key` from the value provided in `.env` into your HTTP requestr headers


### Running the tests

To run the tests:

   ```sh
   npm run test
   ```
 
  - `Jest preset is used to run MongoDB memory server`

![npm-run-test-result]

<p align="right">(<a href="#top">back to top</a>)</p>


### Endpoints

1. <details>
      <summary>Create a Car sample:</summary>
    
      ```
      curl --location --request POST 'localhost:4000/car' \
      --header 'x-api-key: cognigy' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "brand": "BMW",
          "model": "Series 7 750i xDrive",
          "registrationYear": 2021,
          "price": 23300,
          "seats": 4,
          "color": "black",
          "imgUrl": "https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/KJ4AAOSwQ0Zh7npP/$_86.jpg"
      }'
      ```
   </details>

2. <details>
      <summary>Update a Car sample:</summary>
      
      ```
      curl --location --request PUT 'localhost:4000/car/6212b45c1b6a0de8182140bf' \
      --header 'x-api-key: cognigy' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "price": 45000
      }'
      ```
   </details>


3. <details>
      <summary>Find a Car Sample:</summary>

      ```
      curl --location --request GET 'localhost:4000/car/6212b45c1b6a0de8182140bf' \
      --header 'x-api-key: cognigy'
      ```
   </details>


4. <details>
      <summary>Get Cars metadata:</summary>

      ```
      curl --location --request GET 'localhost:4000/car' \
      --header 'x-api-key: cognigy'
      ```
   </details>


5. <details>
      <summary>Remove a Car:</summary>

      ```
      curl --location --request DELETE 'localhost:4000/car/6212b45c1b6a0de8182140bf' \
      --header 'x-api-key: cognigy'
      ```
   </details>


6. <details>
      <summary>Bulk insert Cars Sample:</summary>

      ```
      curl --location --request POST 'localhost:4000/cars' \
      --header 'x-api-key: cognigy' \
      --header 'Content-Type: application/json' \
      --data-raw '[
        {
          "brand": "BMW",
          "model": "320i Sedan Advantage LED",
          "registrationYear": 2012,
          "price": 31000,
          "seats": 4,
          "color": "red",
          "imgUrl":
            "https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/7xoAAOSwmvBhof98/$_86.jpg"
        },
        {
          "brand": "BMW",
          "model": "420xi Gran Coupe Steptronic",
          "registrationYear": 2021,
          "price": 21000,
          "seats": 4,
          "color": "black",
          "imgUrl":
            "https://i.ebayimg.com/00/s/MTA2NlgxNjAw/z/w4cAAOSw0~JiDOly/$_86.jpg"
        },
        {
          "brand": "BMW",
          "model": "Series 7 750i xDrive",
          "registrationYear": 2021,
          "price": 23300,
          "seats": 4,
          "color": "black",
          "imgUrl":
            "https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/KJ4AAOSwQ0Zh7npP/$_86.jpg"
        },
        {
          "brand": "AUDI",
          "model": "A3 1.4TGi G-TRON S-LiNE",
          "registrationYear": 2020,
          "price": 50000,
          "seats": 4,
          "color": "black",
          "imgUrl":
            "https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/XcEAAOSwNDpiBTYm/$_57.jpg"
        },
        {
          "brand": "AUDI",
          "model": "TT RS Coupé S tr 40",
          "registrationYear": 2017,
          "price": 33400,
          "seats": 4,
          "color": "blue",
          "imgUrl":
            "https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/aE0AAOSwD5phpKqN/$_86.jpg"
        },
        {
          "brand": "AUDI",
          "model": "A4 2.0 TDI",
          "registrationYear": 2012,
          "price": 44430,
          "seats": 4,
          "color": "white",
          "imgUrl":
            "https://i.ebayimg.com/00/s/ODAwWDExOTk=/z/xPMAAOSwVBdhpznl/$_57.jpg"
        },
        {
          "brand": "VOLKSWAGEN",
          "model": "Golf VI Match*1.4 16V",
          "registrationYear": 2017,
          "price": 41000,
          "seats": 4,
          "color": "grey",
          "imgUrl":
            "https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/rk8AAOSwIlVh~PJj/$_27.jpg"
        },
        {
          "brand": "VOLKSWAGEN",
          "model": "Golf Variant VII Cup BMT",
          "registrationYear": 2020,
          "price": 24000,
          "seats": 4,
          "color": "black",
          "imgUrl":
            "https://i.ebayimg.com/00/s/MTA4MFgxNDQw/z/vMkAAOSwBuhh8JWf/$_27.jpg"
        }
      ]'
      ```
   </details>


<p align="right">(<a href="#top">back to top</a>)</p>


### Running Postman tests

  To run end2end tests using Postman, you can import the test collection into your postman:

- `postman-tests/cognigy.postman_collection.json`

The test results would be like:

![postman-test-results]

<!-- CONTACT -->
## Contact

Peyman Mashhadi - peyman.ma84@gmail.com


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/peyman-mashhadi-6b0b991b4/
[npm-run-test-result]: images/npm-run-test-result.png
[postman-test-results]: images/postman-test-results.png