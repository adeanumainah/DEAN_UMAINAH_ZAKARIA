
//function untuk menjalankan image slider
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll('.slide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 4000);
}


//aksi untuk pengisian form
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const criticism = document.getElementById('criticism').value;
    const suggestions = document.getElementById('suggestions').value;

    if (name === '' || email === '' || criticism === '' || suggestions === '') {
        alert('All fields are required.');
        return;
    }

    alert('Thank you for your feedback, ' + name + '!\nWe appreciate your criticism and suggestions.');
    
    document.getElementById('feedbackForm').reset();
});