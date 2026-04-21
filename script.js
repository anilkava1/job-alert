// DHAYAN DE: Is URL ko check kar lena, space 'Public' hona chahiye
const API_URL = "https://anilkava-job-api.hf.space/jobs"; 

async function loadJobs() {
    const tableBody = document.getElementById('job-table-body');
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        tableBody.innerHTML = ""; 

        if (data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center; padding:20px;'>No data found. Backend check karein.</td></tr>";
            return;
        }

        data.forEach(job => {
            const jobImg = job.image ? job.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/National_Emblem_of_India_%28Classic_Outline%29.svg/50px-National_Emblem_of_India_%28Classic_Outline%29.svg.png";
            
            const row = `
                <tr>
                    <td style="text-align:center;"><img src="${jobImg}" style="width:45px; border-radius:4px; border:1px solid #ddd;"></td>
                    <td><div style="font-weight:bold; color:#002e5b; font-size:15px;">${job.title}</div></td>
                    <td><div style="font-size:13px; color:#555; line-height:1.4;">${job.description}</div></td>
                    <td>
                        <a href="${job.link}" target="_blank" rel="noopener noreferrer" style="background:#28a745; color:white; padding:10px 18px; text-decoration:none; border-radius:5px; font-weight:bold; font-size:13px; display:inline-block;">Apply Now</a>
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