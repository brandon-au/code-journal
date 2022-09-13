var $photoUpload = document.querySelector('#photo');

// https://miro.medium.com/max/2400/1*Csahvngj_g332RhhgD7OPQ.jpeg
// image link for testing

$photoUpload.addEventListener('input', imagePreview);

var $image = document.querySelector('#preview');
function imagePreview(event) {
  $image.setAttribute('src', event.target.value);
}
