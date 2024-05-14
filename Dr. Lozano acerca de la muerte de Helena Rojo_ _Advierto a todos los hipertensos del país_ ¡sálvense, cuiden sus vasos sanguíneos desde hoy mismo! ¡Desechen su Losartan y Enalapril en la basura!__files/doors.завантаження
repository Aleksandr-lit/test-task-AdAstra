let doors = document.querySelectorAll(".door");
let doorSales = document.querySelectorAll(".door__sales");
let doorWrapper = document.querySelector(".door__wrapper");
let spinResultWrapper = document.querySelector(".spin-result-wrapper");
let orderBlock = document.querySelector("#order");
let door1 = document.getElementById("door__1");
let door2 = document.getElementById("door__2");
let door3 = document.getElementById("door__3");
let doorSale1 = document.getElementById("door__sales1");
let doorSale2 = document.getElementById("door__sales2");
let doorSale3 = document.getElementById("door__sales3");

let discount = "70%" //
doors.forEach(function(door) {
    door.addEventListener("click", openDoor);
});

var closePopup = document.querySelector(".close-popup");
$(".pop-up-button").click(function (a) {
    $('.spin-result-wrapper').fadeOut();
    a.preventDefault()

    $('.spin-result-wrapper').fadeOut();
    var b = $("#goToForm").offset().top;
    $("body,html").animate({scrollTop: b}, 400)


});
$(".close-popup, .pop-up-button").click(function (a) {
    $('.spin-result-wrapper').fadeOut();
    a.preventDefault()
    $('.spin-result-wrapper').fadeOut();
});


function openDoor(e) {
    e.currentTarget.classList.add("open");
    //должна выпадать всплывашка после открытие 1й двери

    setTimeout(function() {
        spinResultWrapper.style.display = "block";
        setTimeout(function() {
            orderBlock.style.display = "block";
            doorWrapper.style.display = "none";
            document.querySelector(".door__head").style.display = "none";
            start_timer && start_timer()
        }, 3500);
    }, 1500);

    doorSales.forEach(function(sale) {
        if (door1.classList.contains("open")) {
            doorSale1.innerHTML = discount;
            // doorSale1.style.left = "12px";

            doorSale2.innerHTML = discount === "70%" ? "50%" : "70%";
            // doorSale2.style.left = "30px";

            doorSale3.innerHTML = discount === "70%" ? "25%" : "50%";
            // doorSale3.style.left = "32px";
        } else if (door2.classList.contains("open")) {
            doorSale2.innerHTML = discount;
            // doorSale2.style.left = "12px";

            doorSale1.innerHTML = discount === "70%" ? "25%" : "50%";
            // doorSale1.style.left = "32px";

            doorSale3.innerHTML = discount === "70%" ? "50%" : "70%";
            // doorSale3.style.left = "30px";
        } else if (door3.classList.contains("open")) {
            doorSale1.innerHTML = discount === "70%" ? "50%" : "70%";
            // doorSale1.style.left = "30px";

            doorSale3.innerHTML = discount;
            // doorSale3.style.left = "12px";

            doorSale2.innerHTML = discount === "70%" ? "25%" : "50%";
            // doorSale2.style.left = "32px";
        }

    });

    for (let i = 0; i < doors.length; i++) {
        if (!doors[i].classList.contains("open")) {
            setTimeout(function() {
                doors[i].classList.add("open");
            }, 2500);
        }
    }

    for (let j = 0; j < doors.length; j++) {
        doors[j].removeEventListener("click", openDoor);
    }
}




var time = 600;
var intr;

function start_timer() {
    intr = setInterval(tick, 1000);
}


function tick() {
    time = time - 1;
    var mins = Math.floor(time / 60);
    var secs = time - mins * 60;
    if (mins == 0 && secs == 0) {
        clearInterval(intr);
    }
    secs = secs >= 10 ? secs : "0" + secs;
    mins = mins >= 10 ? mins : "0" + mins;
    $("#min").html(mins);
    $("#sec").html(secs);
}