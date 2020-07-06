import DataSource from "./data/data-source.js";
import DB from "./data/db.js";
document.addEventListener("DOMContentLoaded", function () {
    DB.init();

    // Load page content
    if (window.location.hash.substr(1) == "") {
        loadPage("home");
    }

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "page/" + page + ".html", true);
        xhttp.send();
    }

    //   var page = window.location.hash.substr(1);
    //   if (page == "") page = "home";
    //   loadPage(page);

    document.querySelectorAll(".nav-bottom .col a").forEach(function (elm) {
        elm.addEventListener("click", function (event) {

            //check posisi current aktif
            const current = document.getElementsByClassName("active");
            //replace current aktif jadi tidak aktif
            current[0].className = current[0].className.replace(" active", "");
            //tambahkan aktif ke target elemen
            event.target.className += " active";
            //ambil atribut href
            const page = event.target.parentElement.getAttribute("href").substr(1);
            // const page = event.target.parentElement.getAttribute("href"); 
            if (page == "home") {
                loadPage(page);
            } else if (page == "jadwal") {
                loadPage(page);
                DataSource.getMatch().then(value => {
                    let dataMatch = value.matches;
                    dataMatch.length = Math.min(dataMatch.length, 10);

                    for (let i = 0; i < dataMatch.length; i++) {

                        const d = new Date(dataMatch[i].utcDate);
                        const hours = d.getHours();
                        const minutes = d.getMinutes();
                        const date = d.getDate();
                        const month = d.getMonth() + 1;
                        const year = d.getFullYear();
                        const dateStr = date + "/" + month + "/" + year;

                        document.getElementById("itemJadwal").innerHTML += `
                        <div class="col m6 s12">
                            <div class="card-schedule card">
                                <p> ${dateStr}, ${hours}:${minutes}</p>
                                <img id="bookmark" class="bookmark" data-id="${dataMatch[i].id}" src="../img/ic_bookmark.svg" alt="">
                                <div>
                                    <p class="f-left">${dataMatch[i].awayTeam.name}</p>
                                    <p class="f-right">${dataMatch[i].score.fullTime.awayTeam}</p>
                                </div>
                                <hr class="clear-both">
                                <div>
                                    <p class="f-left">${dataMatch[i].homeTeam.name}</p>
                                    <p class="f-right">${dataMatch[i].score.fullTime.homeTeam}</p>
                                </div>
                            </div>
                        </div>
                        `;

                    }

                    const bookmark = document.querySelectorAll("#bookmark");
                    for (var i = 0; i < bookmark.length; i += 1) {
                        bookmark[i].addEventListener("click", (a) => {
                            for (const key in dataMatch) {
                                if (dataMatch[key].id == a.target.getAttribute("data-id")) {
                                    DB.save(dataMatch[key]);
                                }
                            }
                        });
                    }

                });


            } else if (page == "klasemen") {
                loadPage(page);
                DataSource.getStanding().then(value => {

                    const dataStanding = value.standings[0].table;
                    for (let b = 0; b < dataStanding.length; b++) {
                        document.getElementById('tbody-content').innerHTML += `
                        <tr>
                           <td class="team-img"><img src="${dataStanding[b].team.crestUrl}" alt=""> ${dataStanding[b].team.name}</td>
                           <td>${dataStanding[b].playedGames}</td>
                           <td>${dataStanding[b].won}</td>
                           <td>${dataStanding[b].draw}</td>
                           <td>${dataStanding[b].lost}</td>
                           <td>${dataStanding[b].goalsFor}</td>
                           <td>${dataStanding[b].points}</td>
                       </tr>
                    `;
                    }

                });
            } else if (page == "bookmark") {
                loadPage(page);

                const dataJadwal = DB.show();
                dataJadwal.then(data => {
                    console.log(data.length);
                    for (let i = 0; i < data.length; i++) {
                        const e = new Date(data[i].utcDate);

                        const savedHours = e.getHours();
                        const savedMinutes = e.getMinutes();
                        const savedDate = e.getDate();
                        const savedMonth = e.getMonth() + 1;
                        const savedYear = e.getFullYear();
                        const dateSaved = savedDate + "/" + savedMonth + "/" + savedYear;
                         document.getElementById('item-bookmark').innerHTML += `
                         <div class="col m6 s12">
                             <div class="card-schedule card">
                                 <p> ${dateSaved}, ${savedHours}:${savedMinutes}</p>
                                 <img id="bookmark" class="bookmark" data-id="${data[i].id}" src="../img/ic_bookmark.svg" alt="">
                                 <div>
                                     <p class="f-left">${data[i].awayTeam.name}</p>
                                     <p class="f-right">${data[i].score.fullTime.awayTeam}</p>
                                 </div>
                                 <hr class="clear-both">
                                 <div>
                                     <p class="f-left">${data[i].homeTeam.name}</p>
                                     <p class="f-right">${data[i].score.fullTime.homeTeam}</p>
                                 </div>
                             </div>
                         </div>
                         `;

                    }

                });
            }
            //loadPage(page);
        });
    });







});