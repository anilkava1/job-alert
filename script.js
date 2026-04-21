const API_URL = "https://anilkava-job-api.hf.space/jobs"; // Update with your actual URL

async function loadJobs() {
    const tableBody = document.getElementById('job-table-body');
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        tableBody.innerHTML = ""; 

        data.forEach(job => {
            // Default image agar job image na mile
            const jobImg = job.image ? job.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/National_Emblem_of_India_%28Classic_Outline%29.svg/50px-National_Emblem_of_India_%28Classic_Outline%29.svg.png";
            
            const row = `
                <tr>
                    <td style="text-align:center;"><img src="${jobImg}" style="width:50px; border-radius:4px; border:1px solid #ddd;"></td>
                    <td><div class="job-title">${job.title}</div></td>
                    <td><div class="job-desc">${job.description}</div></td>
                    <td>
                        <a href="${job.link}" target="_blank" rel="noopener noreferrer" class="apply-btn">Apply Now</a>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (err) {
        tableBody.innerHTML = "<tr><td colspan='4' style='color:red; text-align:center;'>Fetch Error!</td></tr>";
    }
}
loadJobs();