// 1. IS LINK KO APNE BACKEND SPACE KE "DIRECT URL" SE BADLO
// Example: const API_URL = "https://anil-job-api.hf.space/jobs";
const API_URL = "https://anilkava-job-api.hf.space/jobs"; 

async function loadJobs() {
    const tableBody = document.getElementById('job-table-body');
    
    try {
        // Data fetch karna
        const response = await fetch(API_URL);
        
        // Agar response sahi nahi hai toh error throw karein
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Loader hatayein
        tableBody.innerHTML = ""; 

        // Agar data khali hai
        if (data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>Abhi koi jobs update nahi hui hain.</td></tr>";
            return;
        }

        // Data ko table mein bharna
        data.forEach(job => {
            const row = `
                <tr>
                    <td><div class="job-title">${job.title}</div></td>
                    <td><div class="job-desc">${job.description}</div></td>
                    <td><a href="${job.link}" target="_blank" class="apply-btn">Apply Now</a></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        console.error("Fetch Error:", err);
        tableBody.innerHTML = `<tr><td colspan='3' style='color:red; text-align:center; padding:20px;'>
            <b>Connection Error!</b><br>
            Check karein: 1. Backend 'Public' hai? 2. URL sahi hai?
        </td></tr>`;
    }
}

// Function ko call karna
loadJobs();