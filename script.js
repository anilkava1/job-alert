// DHAYAN DE: Is URL ke peeche ek query parameter dala hai cache bypass ke liye
const API_URL = "https://anilkava1-job-api.hf.space/jobs?t=" + new Date().getTime(); 

async function loadJobs() {
    const tableBody = document.getElementById('job-table-body');
    
    try {
        // Mode 'cors' force kiya hai taaki security block na kare
        const response = await fetch(API_URL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        tableBody.innerHTML = ""; 

        if (!data || data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center;'>No jobs found in API.</td></tr>";
            return;
        }

        data.forEach(job => {
            const jobImg = job.image ? job.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/National_Emblem_of_India_%28Classic_Outline%29.svg/50px-National_Emblem_of_India_%28Classic_Outline%29.svg.png";
            const jobLink = job.link ? job.link : "#";

            const row = `
                <tr>
                    <td style="text-align:center;"><img src="${jobImg}" style="width:40px; border-radius:4px; border:1px solid #ddd;"></td>
                    <td><div style="font-weight:bold; color:#002e5b;">${job.title}</div></td>
                    <td><div style="font-size:13px; color:#555;">${job.description}</div></td>
                    <td>
                        <a href="${jobLink}" target="_blank" rel="noopener noreferrer" style="background:#28a745; color:white; padding:8px 15px; text-decoration:none; border-radius:4px; font-weight:bold; font-size:12px; display:inline-block;">Apply Now</a>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        console.error("Fetch Error:", err);
        tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center; color:red; padding:20px;'><b>Connection Error!</b><br>Please check Backend Public settings.</td></tr>";
    }
}

loadJobs();