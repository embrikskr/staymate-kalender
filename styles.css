document.addEventListener("DOMContentLoaded", function() {
    const prevPeriodButton1 = document.getElementById("prevPeriod1");
    const nextPeriodButton1 = document.getElementById("nextPeriod1");
    const calendarView1 = document.getElementById("calendarView1");
    const calendarInfo1 = document.getElementById("calendarInfo1");

    const prevPeriodButton2 = document.getElementById("prevPeriod2");
    const nextPeriodButton2 = document.getElementById("nextPeriod2");
    const calendarView2 = document.getElementById("calendarView2");
    const calendarInfo2 = document.getElementById("calendarInfo2");

    const planForm = document.getElementById("planForm");

    let currentDate1 = new Date();
    let currentDate2 = new Date();

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

    function savePlans(calendar, plans) {
        localStorage.setItem(`calendarPlans_${calendar}`, JSON.stringify(plans));
    }

    function loadPlans(calendar) {
        const plans = localStorage.getItem(`calendarPlans_${calendar}`);
        return plans ? JSON.parse(plans) : {};
    }

    function renderWeekView(calendar, date) {
        const plans = loadPlans(calendar);
        const startOfWeek = getWeekStart(date);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const calendarInfo = calendar === 'calendar1' ? calendarInfo1 : calendarInfo2;
        const calendarView = calendar === 'calendar1' ? calendarView1 : calendarView2;

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

        for (let day of days) {
            const earlyDiv = document.createElement('div');
            earlyDiv.dataset.date = day.toISOString().split('T')[0];
            earlyDiv.dataset.hour = 'early';
            earlyDiv.textContent = `${day.toLocaleDateString('en-US', { weekday: 'short' })} 0:00-8:00`;
            if (day.toISOString().split('T')[0] === now.toISOString().split('T')[0] && now.getHours() < 8) {
                earlyDiv.classList.add('current-time-slot');
            }
            calendarView.appendChild(earlyDiv);

            for (let hour = 8; hour < 24; hour++) {
                const dayHourDiv = document.createElement('div');
                dayHourDiv.dataset.date = day.toISOString().split('T')[0];
                dayHourDiv.dataset.hour = hour;
                dayHourDiv.textContent = `${hour}:00`;

                if (day.toISOString().split('T')[0] === now.toISOString().split('T')[0]) {
                    if (hour === now.getHours()) {
                        dayHourDiv.classList.add('current-time-slot');
                    } else {
                        dayHourDiv.classList.add('current-day');
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

    function addPlanToCalendar(calendar, date, startTime, endTime, description, color) {
        const plans = loadPlans(calendar);
        const dateStr = new Date(date).toISOString().split('T')[0];
        const startHour = parseInt(startTime.split(':')[0]);
        const endHour = parseInt(endTime.split(':')[0]);

        if (startHour < 8) {
            for (let hour = startHour; hour < Math.min(endHour, 8); hour++) {
                const planKey = `${dateStr}-early`;
                plans[planKey] = { date, startTime, endTime, description, color };
            }
            if (endHour > 8) {
                for (let hour = 8; hour < endHour; hour++) {
                    const planKey = `${dateStr}-${hour}`;
                    plans[planKey] = { date, startTime, endTime, description, color };
                }
            }
        } else {
            for (let hour = startHour; hour < endHour; hour++) {
                const planKey = `${dateStr}-${hour}`;
                plans[planKey] = { date, startTime, endTime, description, color };
            }
        }

        savePlans(calendar, plans);
        if (calendar === 'calendar1') {
            renderWeekView('calendar1', currentDate1);
        } else {
            renderWeekView('calendar2', currentDate2);
        }
    }

    prevPeriodButton1.addEventListener("click", function() {
        currentDate1.setDate(currentDate1.getDate() - 7);
        renderWeekView('calendar1', currentDate1);
    });

    nextPeriodButton1.addEventListener("click", function() {
        currentDate1.setDate(currentDate1.getDate() + 7);
        renderWeekView('calendar1', currentDate1);
    });

    prevPeriodButton2.addEventListener("click", function() {
        currentDate2.setDate(currentDate2.getDate() - 7);
        renderWeekView('calendar2', currentDate2);
    });

    nextPeriodButton2.addEventListener("click", function() {
        currentDate2.setDate(currentDate2.getDate() + 7);
        renderWeekView('calendar2', currentDate2);
    });

    planForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const calendar = document.getElementById("planCalendar").value;
        const date = document.getElementById("planDate").value;
        const startTime = document.getElementById("planStartTime").value;
        const endTime = document.getElementById("planEndTime").value;
        const description = document.getElementById("planDescription").value;
        const color = document.getElementById("planColor").value;

        addPlanToCalendar(calendar, date, startTime, endTime, description, color);

        planForm.reset();
    });

    // Initialize with week view
    renderWeekView('calendar1', currentDate1);
    renderWeekView('calendar2', currentDate2);
});
