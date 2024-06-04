document.addEventListener("DOMContentLoaded", function() {
    const prevPeriodButton = document.getElementById("prevPeriod");
    const nextPeriodButton = document.getElementById("nextPeriod");
    const calendarView = document.getElementById("calendarView");
    const calendarInfo = document.getElementById("calendarInfo");
    const planForm = document.getElementById("planForm");

    let currentDate = new Date();

    function getMonthName(monthIndex) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[monthIndex];
    }

    function getWeekStart(date) {
        const start = new Date(date);
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1);
        start.setDate(diff);
        return start;
    }

    function savePlans(plans) {
        localStorage.setItem('calendarPlans', JSON.stringify(plans));
    }

    function loadPlans() {
        const plans = localStorage.getItem('calendarPlans');
        return plans ? JSON.parse(plans) : {};
    }

    function renderWeekView(date) {
        const plans = loadPlans();
        const startOfWeek = getWeekStart(date);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        calendarInfo.textContent = `Week of ${startOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

        calendarView.className = 'calendar-grid week-view';
        calendarView.innerHTML = '';
        const now = new Date();

        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day);
        }

        for (let hour = 0; hour < 24; hour++) {
            for (let day of days) {
                const dayHourDiv = document.createElement('div');
                dayHourDiv.dataset.date = day.toISOString().split('T')[0];
                dayHourDiv.dataset.hour = hour;
                dayHourDiv.textContent = `${day.toLocaleDateString('en-US', { weekday: 'short' })} ${hour}:00`;

                if (day.toISOString().split('T')[0] === now.toISOString().split('T')[0]) {
                    dayHourDiv.classList.add('current-day');
                    if (hour === now.getHours()) {
                        dayHourDiv.classList.add('current-time-slot');
                    }
                }

                const planKey = `${dayHourDiv.dataset.date}-${hour}`;
                if (plans[planKey]) {
                    dayHourDiv.classList.add('plan-item', plans[planKey].color);
                    dayHourDiv.textContent = `${plans[planKey].description} (${plans[planKey].startTime} - ${plans[planKey].endTime})`;
                }

                calendarView.appendChild(dayHourDiv);
            }
        }
    }

    function addPlanToCalendar(date, startTime, endTime, description, color) {
        const plans = loadPlans();
        const dateStr = new Date(date).toISOString().split('T')[0];
        const startHour = parseInt(startTime.split(':')[0]);
        const endHour = parseInt(endTime.split(':')[0]);

        for (let hour = startHour; hour < endHour; hour++) {
            const planKey = `${dateStr}-${hour}`;
            plans[planKey] = { date, startTime, endTime, description, color };
        }

        savePlans(plans);
        renderWeekView(currentDate);
    }

    prevPeriodButton.addEventListener("click", function() {
        currentDate.setDate(currentDate.getDate() - 7);
        renderWeekView(currentDate);
    });

    nextPeriodButton.addEventListener("click", function() {
        currentDate.setDate(currentDate.getDate() + 7);
        renderWeekView(currentDate);
    });

    planForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const date = document.getElementById("planDate").value;
        const startTime = document.getElementById("planStartTime").value;
        const endTime = document.getElementById("planEndTime").value;
        const description = document.getElementById("planDescription").value;
        const color = document.getElementById("planColor").value;

        addPlanToCalendar(date, startTime, endTime, description, color);

        planForm.reset();
    });

    // Initialize with week view
    renderWeekView(currentDate);
});
