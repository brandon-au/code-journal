var $photoUpload = document.querySelector('#photo');

// https://miro.medium.com/max/2400/1*Csahvngj_g332RhhgD7OPQ.jpeg
// image link for testing

var $image = document.querySelector('#preview');
$photoUpload.addEventListener('input', function () {
  $image.setAttribute('src', event.target.value);
});

var $journalEntry = document.querySelector('#journal-entry');
var $submit = document.querySelector('.submit-btn');
$submit.addEventListener('submit', submitData);

function submitData() {
  var entryData = {
    Title: $journalEntry.elements.Title.value,
    $image,
    Notes: $journalEntry.elements.Notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId.value++;
  $journalEntry.prepend(entryData);
}
