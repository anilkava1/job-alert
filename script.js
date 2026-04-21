// DHAYAN SE: Is URL ko apne asli backend space link se badlo
const API_URL = "https://anilkava1-job-api.hf.space/jobs"; 

async function loadJobs() {
    const tableBody = document.getElementById('job-table-body');
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center;'>No jobs found.</td></tr>";
            return;
        }

        tableBody.innerHTML = ""; 

        data.forEach(job => {
            const jobImg = job.image ? job.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/National_Emblem_of_India_%28Classic_Outline%29.svg/50px-National_Emblem_of_India_%28Classic_Outline%29.svg.png";
            
            const row = `
                <tr>
                    <td style="text-align:center;"><img src="${jobImg}" style="width:45px; border-radius:4px; border:1px solid #ddd;"></td>
                    <td><div style="font-weight:bold; color:#002e5b;">${job.title}</div></td>
                    <td><div style="font-size:13px; color:#555;">${job.description}</div></td>
                    <td>
                        <a href="${job.link}" target="_blank" style="background:#28a745; color:white; padding:8px 15px; text-decoration:none; border-radius:4px; font-weight:bold; font-size:12px; display:inline-block;">Apply Now</a>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (err) {
        tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center; color:red; padding:20px;'>Fetch Error! Check if Backend is Public and Running.</td></tr>";
    }
}
loadJobs();