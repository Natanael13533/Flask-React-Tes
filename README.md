<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Branch yang di download ada pada branch frontend dan backend</h1>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
Tes Flask dan ReactProject:
* Menggunakan React sebagai Frontend
* Menggunakan Flask sebagai Backend
* Menggunakan JWT Auth sebagai proses autentikasi

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Flask][Flask]][Flask-url]
* [![SQLite][SQLite]][SQLite-url]
* [![React][React]][React-url]
* [![JWT][JWT]][JWT-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Berikut cara untuk Clone Project.

### Backend

1. Clone repo backend
   ```sh
   git clone -b backend https://github.com/Natanael13533/Flask-React-Tes.git
   ```
2. ubah nama project yang sudah di clone menjadi backend(atau bisa yang lain), lalu pindah terminal ke project yang sudah ke clone
   ```sh
   cd backend
   ```
3. buat venv
   ```sh
   python -m venv venv
   ```
4. install requirements
   ```sh
   pip install -r requirements.txt
   ```
5. migrasi database
   ```
    flask db init
    flask db migrate -m "initial"
    flask db upgrade
   ``` 
7. setup env
   ```
   SECRET_KEY=secret-key-anda
   SQLALCHEMY_DATABASE_URI=sqlite:///data.db
   JWT_SECRET_KEY =jwt-secret-key-anda
   ```
8. jalankan backend
   ```
   flask run
   ```
### Frontend

1. Clone repo frontend
   ```sh
   git clone -b frontend https://github.com/Natanael13533/Flask-React-Tes.git
   ```
2. ubah nama project yang sudah di clone menjadi backend(atau bisa yang lain), lalu pindah terminal ke project yang sudah ke clone
   ```sh
   cd frontend
   ```
3. install dependencies
   ```sh
   npm install
   ```
4. start frontend
   ```
   npm start
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Flask]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/stable/
[SQLite]: https://img.shields.io/badge/SQLite-07405E?style=flat&compact=true&logo=sqlite&logoColor=white
[SQLite-url]: https://sqlite.org/
[React]: https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge
[React-url]: https://react.dev/
[JWT]: https://img.shields.io/badge/JWT-black?style=plastic&logo=JSON%20web%20tokens
[JWT-url]: https://jwt-auth.readthedocs.io/en/develop/