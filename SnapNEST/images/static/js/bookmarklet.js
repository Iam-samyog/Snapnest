const siteURL = '//127.0.0.1:8000/';
const styleURL = siteURL + 'static/css/bookmarklet.css';
const minWidth = 250;
const minHeight = 250;

// Load CSS
var head = document.getElementsByTagName('head')[0];  // FIXED: was getElementByTagName (wrong)
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleURL + '?r=' + Math.floor(Math.random() * 9999999999999999);
head.appendChild(link);

// Load HTML
var body = document.getElementsByTagName('body')[0];  // FIXED: was correct
var boxHtml = `
    <div id="bookmarklet">
        <a href="#" id="close">&times;</a>
        <h1>Select an image to bookmark:</h1>
        <div class="images"></div>  <!-- FIXED: missing quote -->
    </div>
`;
body.innerHTML += boxHtml;

function bookmarkletLaunch() {
    var bookmarklet = document.getElementById('bookmarklet');
    var imagesFound = bookmarklet.querySelector('.images');

    // Clear images found
    imagesFound.innerHTML = '';

    // Display bookmarklet
    bookmarklet.style.display = 'block';

    // Close event
    bookmarklet.querySelector('#close').addEventListener('click', function () {
        bookmarklet.style.display = 'none';
    });

    // Find images in the DOM with the minimum dimensions
    var images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]'); // FIXED: querySelectorAll was misspelled
    images.forEach(image => {
        if (image.naturalWidth >= minWidth && image.naturalHeight >= minHeight) {
            var imageFound = document.createElement('img');
            imageFound.src = image.src;
            imagesFound.append(imageFound);
        }
    });

    //select image event
    imagesFound.querySelectorAll('img').forEach(image=>{
        image.addEventListener('click',function(event){
            imageSelected=event.target;
            bookmarklet.style.display='none';
            window.open(siteURL +'images/create/?url='
                +encodeURIComponent(imageSelected.src)+ '&title='+ encodeURIComponent(document.title),+'_blank'
            );
        })
    })
}

// Launch the bookmarklet
bookmarkletLaunch();
