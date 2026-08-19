// =========================================================
// RIMBI TRAVEL & TOURS
// JOURNEY SEARCH
// =========================================================

const bookingForm = document.querySelector("#booking form");

const fromSelect = document.querySelector("#from");
const toSelect = document.querySelector("#to");
const dateInput = document.querySelector("#date");
const passengersInput = document.querySelector("#passengers");


// =========================================================
// ROUTE INFORMATION
// =========================================================

const routes = {

    "harare-lilongwe": {
        name: "Harare → Lilongwe",
        frequency: "Daily",
        checkIn: "6:30 AM",
        departure: "7:00 AM",
        departurePoint:
            "Roadport Depot, 4th Street, Harare, Zimbabwe"
    },

    "lilongwe-harare": {
        name: "Lilongwe → Harare",
        frequency: "Daily",
        checkIn: "5:30 AM",
        departure: "6:00 AM",
        departurePoint:
            "Grand Business Park, Unit B3, Lilongwe, Malawi"
    },

    "harare-dar-es-salaam": {
        name: "Harare → Dar es Salaam",
        frequency: "Weekly — Friday",
        checkIn: "6:00 AM",
        departure: "6:30 AM",
        departurePoint:
            "Roadport Depot, 4th Street, Harare, Zimbabwe"
    },

    "dar-es-salaam-harare": {
        name: "Dar es Salaam → Harare",
        frequency: "Weekly — Tuesday",
        checkIn: "5:00 PM",
        departure: "7:00 PM",
        departurePoint:
            "Corner Narungombe Street, next to Rising Sun Hotel, opposite Hong Kong Hotel, Kariakoo, Dar es Salaam"
    }

};


// =========================================================
// CREATE RESULT AREA
// =========================================================

const result = document.createElement("div");

result.id = "booking-result";

result.style.display = "none";

bookingForm.after(result);


// =========================================================
// SEARCH JOURNEY
// =========================================================

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const from = fromSelect.value;

    const to = toSelect.value;

    const date = dateInput.value;

    const passengers = passengersInput.value;


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (!from || !to || !date || !passengers) {

        showMessage(
            "Please complete all journey details before searching.",
            "error"
        );

        return;
    }


    // -----------------------------------------------------
    // PREVENT SAME CITY
    // -----------------------------------------------------

    if (from === to) {

        showMessage(
            "Departure and destination cannot be the same.",
            "error"
        );

        return;
    }


    // -----------------------------------------------------
    // FIND ROUTE
    // -----------------------------------------------------

    const routeKey = `${from}-${to}`;

    const route = routes[routeKey];


    if (!route) {

        showMessage(
            "This route is not currently listed. Please contact Rimbi Travel & Tours for assistance.",
            "error"
        );

        return;
    }


    // -----------------------------------------------------
    // CHECK DATE
    // -----------------------------------------------------

    const selectedDate = new Date(date + "T00:00:00");

    const day = selectedDate.getDay();


    // Sunday = 0
    // Monday = 1
    // Tuesday = 2
    // Wednesday = 3
    // Thursday = 4
    // Friday = 5
    // Saturday = 6


    if (
        routeKey === "harare-dar-es-salaam" &&
        day !== 5
    ) {

        showMessage(
            "Harare → Dar es Salaam is currently scheduled for Fridays.",
            "error"
        );

        return;
    }


    if (
        routeKey === "dar-es-salaam-harare" &&
        day !== 2
    ) {

        showMessage(
            "Dar es Salaam → Harare is currently scheduled for Tuesdays.",
            "error"
        );

        return;
    }


    // -----------------------------------------------------
    // SHOW RESULT
    // -----------------------------------------------------

    result.style.display = "block";

    result.innerHTML = `

        <div class="booking-success">

            <div class="booking-status">
                JOURNEY FOUND
            </div>

            <h3>
                ${route.name}
            </h3>

            <p>
                Your selected journey is available
                according to the current Rimbi schedule.
            </p>

            <div class="booking-summary">

                <div>
                    <span>Travel Date</span>
                    <strong>
                        ${formatDate(date)}
                    </strong>
                </div>

                <div>
                    <span>Passengers</span>
                    <strong>
                        ${passengers}
                    </strong>
                </div>

                <div>
                    <span>Check-in</span>
                    <strong>
                        ${route.checkIn}
                    </strong>
                </div>

                <div>
                    <span>Departure</span>
                    <strong>
                        ${route.departure}
                    </strong>
                </div>

            </div>


            <div class="booking-location">

                <strong>
                    Departure Point
                </strong>

                <p>
                    ${route.departurePoint}
                </p>

            </div>


            <div class="booking-actions">

                <a href="#contact">
                    Contact Rimbi to Book
                </a>

                <button
                    type="button"
                    id="clear-search"
                >
                    Search Again
                </button>

            </div>

        </div>

    `;


    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    // -----------------------------------------------------
    // SEARCH AGAIN
    // -----------------------------------------------------

    const clearButton =
        document.querySelector("#clear-search");


    clearButton.addEventListener(
        "click",
        function () {

            result.style.display = "none";

            result.innerHTML = "";

            bookingForm.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

});


// =========================================================
// FORMAT DATE
// =========================================================

function formatDate(dateString) {

    const date = new Date(
        dateString + "T00:00:00"
    );


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


// =========================================================
// MESSAGE
// =========================================================

function showMessage(message, type) {

    result.style.display = "block";

    result.innerHTML = `

        <div class="booking-message ${type}">

            <strong>
                ${type === "error" ? "Journey Notice" : "Information"}
            </strong>

            <p>
                ${message}
            </p>

        </div>

    `;


    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}
