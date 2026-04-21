// DHAYAN DE: Apne Hugging Face Space ka sahi link yahan dalo
const API_URL = "https://anilkava1-job-api.hf.space/jobs"; 

async function loadJobs() {
    const tableBody = document.getElementById('job-table-body');
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        tableBody.innerHTML = ""; // Loader clear karo

        if (data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center; padding:20px;'>Abhi koi jobs available nahi hain.</td></tr>";
            return;
        }

        data.forEach(job => {
            // Agar image nahi hai toh default emblem icon dikhega
            const jobImg = job.image ? job.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/National_Emblem_of_India_%28Classic_Outline%29.svg/50px-National_Emblem_of_India_%28Classic_Outline%29.svg.png";
            
            const row = `
                <tr>
                    <td style="text-align:center;"><img src="${jobImg}" style="width:45px; border-radius:4px; border:1px solid #eee;"></td>
                    <td><div class="job-title" style="font-weight:bold; color:#002e5b;">${job.title}</div></td>
                    <td><div class="job-desc" style="font-size:13px; color:#555; line-height:1.5;">${job.description}</div></td>
                    <td>
                        <a href="${job.link}" target="_blank" rel="noopener noreferrer" class="apply-btn" style="background:#28a745; color:white; padding:10px 18px; text-decoration:none; border-radius:5px; font-weight:bold; font-size:13px; display:inline-block;">Apply Now</a>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        console.error("Fetch Error:", err);
        tableBody.innerHTML = "<tr><td colspan='4' style='color:red; text-align:center; padding:20px;'><b>Data load nahi ho raha!</b><br>Check karein backend Space PUBLIC hai ya nahi.</td></tr>";
    }
}

// Function call
loadJobs();