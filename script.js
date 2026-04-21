// IS LINK KO SAHI SE CHECK KARO
const API_URL = "https://anilkava1-job-api.hf.space/jobs"; 

async function loadJobs() {
    const tableBody = document.getElementById('job-table-body');
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        tableBody.innerHTML = ""; 

        data.forEach(job => {
            const jobImg = job.image ? job.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/National_Emblem_of_India_%28Classic_Outline%29.svg/50px-National_Emblem_of_India_%28Classic_Outline%29.svg.png";
            
            const row = `
                <tr>
                    <td style="text-align:center;"><img src="${jobImg}" style="width:40px; border-radius:4px;"></td>
                    <td><div class="job-title">${job.title}</div></td>
                    <td><div class="job-desc">${job.description}</div></td>
                    <td>
                        <button onclick="startTimer('${job.link}')" class="apply-btn" style="cursor:pointer; border:none;">Apply Now</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (err) {
        // Agar error aaye toh ye dikhega
        tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center; padding:20px; color:red;'>Data load nahi ho raha. Check karein ki Backend PUBLIC hai?</td></tr>";
    }
}

function startTimer(destinationUrl) {
    const modal = document.getElementById('timerModal');
    const countdownElement = document.getElementById('countdown');
    let timeLeft = 9;

    // Ad Trigger
    window.open('YOUR_AD_SMARTLINK_HERE', '_blank');

    modal.style.display = 'flex';
    countdownElement.innerText = timeLeft;

    const timer = setInterval(() => {
        timeLeft--;
        countdownElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            modal.style.display = 'none';
            window.open(destinationUrl, '_blank');
        }
    }, 1000);
}

loadJobs();