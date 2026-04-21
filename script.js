const API_URL = "https://anilkava-job-api.hf.space/jobs"; 

async function loadJobs() {
    const tableBody = document.getElementById('job-table-body');
    try {
        // Fetching ko fast karne ke liye cache bypass
        const response = await fetch(API_URL);
        const data = await response.json();
        
        tableBody.innerHTML = ""; 

        data.forEach(job => {
            const jobImg = job.image ? job.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/National_Emblem_of_India_%28Classic_Outline%29.svg/50px-National_Emblem_of_India_%28Classic_Outline%29.svg.png";
            
            const row = `
                <tr>
                    <td style="text-align:center;"><img src="${jobImg}" style="width:40px; border-radius:4px; border:1px solid #eee;"></td>
                    <td><div class="job-title">${job.title}</div></td>
                    <td><div class="job-desc">${job.description}</div></td>
                    <td>
                        <button onclick="startTimer('${job.link}')" class="apply-btn" style="cursor:pointer; border:none; width:110px;">Apply Now</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (err) {
        tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center; padding:20px; color:red;'>Server busy, please refresh.</td></tr>";
    }
}

// TIMER & POPUP LOGIC
function startTimer(destinationUrl) {
    const modal = document.getElementById('timerModal');
    const countdownElement = document.getElementById('countdown');
    let timeLeft = 9;

    // 1. POPUP ADS TRIGGER (User click ke saath hi trigger)
    // Apne Adsterra Smartlink ko yahan dalo
    const adPopup = window.open('YOUR_AD_SMARTLINK_HERE', '_blank');
    
    // Agar browser popup block kare toh focus wapas main window par layein
    if (adPopup) {
        adPopup.blur();
        window.focus();
    }

    // 2. MODAL SHOW (Ab ye super fast dikhega)
    modal.style.display = 'flex';
    countdownElement.innerText = timeLeft;

    const timer = setInterval(() => {
        timeLeft--;
        countdownElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            modal.style.display = 'none';
            
            // 3. FINAL REDIRECTION (New Tab)
            window.open(destinationUrl, '_blank');
        }
    }, 1000); // 1000ms = 1 second exact
}

loadJobs();