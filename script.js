// Initialize subjects from localStorage if available
function loadSubjects() {
    let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    let subjectList = document.getElementById('subject-list');
    subjectList.innerHTML = ''; // Clear current list

    subjects.forEach(subject => {
        let subjectRow = document.createElement('div');
        subjectRow.classList.add('subject-row');
        
        let subjectName = document.createElement('span');
        subjectName.textContent = subject.name;

        let viewButton = document.createElement('button');
        viewButton.textContent = 'View Files';
        viewButton.onclick = () => viewFiles(subject.name);

        subjectRow.appendChild(subjectName);
        subjectRow.appendChild(viewButton);
        subjectList.appendChild(subjectRow);
    });
}

// Add a new subject
function addSubject() {
    let subjectName = prompt('Enter the subject name:');
    if (subjectName) {
        let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
        subjects.push({ name: subjectName, files: [] });
        localStorage.setItem('subjects', JSON.stringify(subjects));
        loadSubjects();
    }
}

// Upload file for a subject
function uploadFile() {
    let fileInput = document.getElementById('file-input');
    let file = fileInput.files[0];
    if (!file) return;

    let subjectName = prompt('Enter the subject name to store the file in:');
    if (subjectName) {
        let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
        let subject = subjects.find(sub => sub.name === subjectName);

        if (subject) {
            let fileReader = new FileReader();
            fileReader.onload = function () {
                subject.files.push({ name: file.name, data: fileReader.result });
                localStorage.setItem('subjects', JSON.stringify(subjects));
                alert('File uploaded successfully!');
                fileInput.value = ''; // Reset file input
            };
            fileReader.readAsDataURL(file);
        } else {
            alert('Subject not found!');
        }
    }
}

// View files in a subject
function viewFiles(subjectName) {
    let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    let subject = subjects.find(sub => sub.name === subjectName);
    
    if (subject) {
        let fileList = document.createElement('div');
        subject.files.forEach(file => {
            let fileLink = document.createElement('a');
            fileLink.href = file.data;
            fileLink.target = '_blank';
            fileLink.textContent = file.name;
            fileList.appendChild(fileLink);
            fileList.appendChild(document.createElement('br'));
        });
        document.body.appendChild(fileList);
    }
}

// Load the subjects when the page loads
window.onload = loadSubjects;
