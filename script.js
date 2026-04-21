// Link bilkul sahi hai kyunki data browser mein dikh raha hai
const API_URL = "https://anilkava-job-api.hf.space/jobs"; 

async function loadJobs() {
    const tableBody = document.getElementById('job-table-body');
    
    try {
        const response = await fetch(API_URL);
        
        // Agar response sahi nahi hai toh error handling
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Table saaf karo loader hatane ke liye
        tableBody.innerHTML = ""; 

        if (!data || data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center; padding:20px;'>Abhi koi jobs nahi hain.</td></tr>";
            return;
        }

        // Ek-ek line check ki hai, ye loop ab sahi data bharega
        data.forEach(job => {
            // Default icon agar image na ho
            const jobImg = job.image ? job.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/National_Emblem_of_India_%28Classic_Outline%29.svg/50px-National_Emblem_of_India_%28Classic_Outline%29.svg.png";
            
            // Link fix: Agar link khali hai toh button disable dikhega
            const jobLink = job.link ? job.link : "#";

            const row = `
                <tr>
                    <td style="text-align:center; padding:10px;">
                        <img src="${jobImg}" alt="icon" style="width:45px; height:auto; border-radius:4px; border:1px solid #ddd;">
                    </td>
                    <td style="padding:10px;">
                        <div style="font-weight:bold; color:#002e5b; font-size:15px;">${job.title}</div>
                    </td>
                    <td style="padding:10px;">
                        <div style="font-size:13px; color:#555; line-height:1.4;">${job.description}</div>
                    </td>
                    <td style="padding:10px; text-align:center;">
                        <a href="${jobLink}" target="_blank" rel="noopener noreferrer" 
                           style="background:#28a745; color:white; padding:10px 15px; text-decoration:none; border-radius:5px; font-weight:bold; font-size:13px; display:inline-block; transition:0.3s;">
                           Apply Now
                        </a>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        console.error("Critical Error:", err);
        tableBody.innerHTML = `<tr><td colspan='4' style='text-align:center; color:red; padding:30px;'>
            <b>Fetch Error!</b><br>
            Please refresh the page or check internet connection.
        </td></tr>`;
    }
}

// Site khulte hi load karo
loadJobs();