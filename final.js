const jobDivCounter = document.querySelector('.job-div span.total-count');
const interviewDiv = document.getElementById('interview-div');
const rejectedDiv = document.getElementById('rejected-div');
const jobCardContainer = document.getElementById('job-card');







// সেকশন দেখানো/ বন্ধ
function showOnly(id) {
    const sections = [jobCardContainer, interviewDiv, rejectedDiv];
    for (const section of sections) section.classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
    updateCounts(); 
}

// বাটন স্টাইল পরিবর্তন 
function toggleStyle(id) {
    const btnIds = ['all-btn', 'interview-btn', 'rejected-btn'];
    for (const btnId of btnIds) {
        const btn = document.getElementById(btnId);
        btn.classList.remove('bg-[#3B82F6]', 'text-white');
        btn.classList.add('bg-gray-300');
    }
    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-300');
    selected.classList.add('bg-[#3B82F6]', 'text-white');
}

// কাউন্টার আপডেট
function updateCounts() {
    const totalCount = jobCardContainer.querySelectorAll('.card-one').length;
    const interviewCount = interviewDiv.querySelectorAll('.card-one').length;
    const rejectedCount = rejectedDiv.querySelectorAll('.card-one').length;

    document.getElementById('total-count').innerText = totalCount;
    document.getElementById('interview-count').innerText = interviewCount;
    document.getElementById('rejected-count').innerText = rejectedCount;

  
    if (!jobCardContainer.classList.contains('hidden')) {
        jobDivCounter.innerText = `${totalCount} Jobs`;
    } else if (!interviewDiv.classList.contains('hidden')) {
        jobDivCounter.innerText = `${interviewCount} of ${totalCount} Jobs`;
    } else if (!rejectedDiv.classList.contains('hidden')) {
        jobDivCounter.innerText = `${rejectedCount} of ${totalCount} Jobs`;
    }
}

// খালি ডিভ মেসেজ দেখানো 
function toggleEmptyMessages() {
    const targetDivs = [interviewDiv, rejectedDiv];
    for (const target of targetDivs) {
        const cards = target.querySelectorAll('.card-one');
        const noJobsMsg = target.querySelector('.default-show');
        if (noJobsMsg) {
            noJobsMsg.style.display = cards.length > 0 ? 'none' : 'flex';
        }
    }
}



// কার্ড Interview/Rejected ডিভে পাঠানো
function moveCard(jobName, targetStatus) {
    
    const allCards = jobCardContainer.querySelectorAll('.card-one');
    let mainCard = null;
    for (const card of allCards) {
        if (card.querySelector('.job-name').innerText === jobName) {
            mainCard = card;
            break;
        }
    }
    if (!mainCard) return;

    
    let existingInInt = null;
    for (const card of interviewDiv.querySelectorAll('.card-one')) {
        if (card.querySelector('.job-name').innerText === jobName) {
            existingInInt = card;
            break;
        }
    }

   
    let existingInRej = null;
    for (const card of rejectedDiv.querySelectorAll('.card-one')) {
        if (card.querySelector('.job-name').innerText === jobName) {
            existingInRej = card;
            break;
        }
    }

    
    if (targetStatus === 'Interview' && existingInInt) {
        alert('Already in Interview!');
        return;
    }
    if (targetStatus === 'Rejected' && existingInRej) {
        alert('Already in Rejected!');
        return;
    }

    
    if (existingInInt) existingInInt.remove();
    if (existingInRej) existingInRej.remove();

    
    const statusBtn = mainCard.querySelector('.btn-status');
    if (targetStatus === 'Interview') {
        statusBtn.innerText = 'Interview';
        statusBtn.className = 'btn-status btn btn-success';
    } else {
        statusBtn.innerText = 'Rejected';
        statusBtn.className = 'btn-status btn btn-error';
    }

    
    const targetContainer = (targetStatus === 'Interview') ? interviewDiv : rejectedDiv;
    const clone = mainCard.cloneNode(true);
    targetContainer.appendChild(clone);

    toggleEmptyMessages();
    updateCounts();
}

// কার্ড ডিলিট
function deleteCard(card, jobName, parentId) {
    let interviewCard = null;
    let rejectedCard = null;

    if (parentId === 'job-card') {
        for (const interDiv of interviewDiv.querySelectorAll('.card-one')) {
            if (interDiv.querySelector('.job-name').innerText === jobName) {
                interviewCard = interDiv;
                break;
            }
        }

        for (const rejecDiv of rejectedDiv.querySelectorAll('.card-one')) {
            if (rejecDiv.querySelector('.job-name').innerText === jobName) {
                rejectedCard = rejecDiv;
                break;
            }
        }

        if (interviewCard) interviewCard.remove();
        if (rejectedCard) rejectedCard.remove();
        card.remove();
    } else {
        card.remove();
        resetMainCardStatus(jobName);
    }

    toggleEmptyMessages();
    updateCounts();
}

// মেইন কার্ড রিসেট
function resetMainCardStatus(jobName) {
    const allCards = jobCardContainer.querySelectorAll('.card-one');
    for (const card of allCards) {
        if (card.querySelector('.job-name').innerText === jobName) {
            const statusBtn = card.querySelector('.btn-status');
            statusBtn.innerText = 'Not Applied';
            statusBtn.className = 'btn-status btn';
            break;
        }
    }
}



// বাটন ক্লিক / ডিলিট 
document.body.addEventListener('click', function (event) {
    const btn = event.target.closest('.button-interview, .button-rejected, .btn-trash');
    if (!btn) return;

    const card = btn.closest('.card-one');
    const jobName = card.querySelector('.job-name').innerText;
    const parentId = card.parentElement.id;

    if (btn.classList.contains('button-interview')) moveCard(jobName, 'Interview');
    else if (btn.classList.contains('button-rejected')) moveCard(jobName, 'Rejected');
    else if (btn.classList.contains('btn-trash')) deleteCard(card, jobName, parentId);
});



    updateCounts();
    toggleEmptyMessages();
    showOnly('job-card');
    toggleStyle('all-btn');






























