var $photoUpload = document.querySelector('#photo');

// https://miro.medium.com/max/2400/1*Csahvngj_g332RhhgD7OPQ.jpeg
// image link for testing
// Title: Ada Lovelace
// Notes: Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine.

var $image = document.querySelector('#preview');
$photoUpload.addEventListener('input', function () {
  $image.setAttribute('src', event.target.value);
});

var $journalEntry = document.querySelector('#journal-entry');
$journalEntry.addEventListener('submit', submitData);

function submitData(event) {
  event.preventDefault();
  var entryData = {
    Title: $journalEntry.elements.title.value,
    Image: $journalEntry.elements.PhotoURL.value,
    Notes: $journalEntry.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entryData);
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  $journalEntry.reset();
}
