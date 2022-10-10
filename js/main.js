var $photoUpload = document.querySelector('#photo');
// https://miro.medium.com/max/2400/1*Csahvngj_g332RhhgD7OPQ.jpeg
// image link for testing
// Title: Ada Lovelace
// Notes: Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine.

var $ul = document.querySelector('.entry-list');
var $image = document.querySelector('#preview');
$photoUpload.addEventListener('input', function () {
  $image.setAttribute('src', event.target.value);
});

var $journalEntry = document.querySelector('#journal-entry');
$journalEntry.addEventListener('submit', submitData);

// submits entry and stores in localstorage
function submitData(event) {
  event.preventDefault();
  var entryData = {
    Title: $journalEntry.elements.title.value,
    Image: $journalEntry.elements.PhotoURL.value,
    Notes: $journalEntry.elements.notes.value,
    entryId: data.nextEntryId
  };
  if (data.editing !== null) {
    var updatedEntry = {
      Title: $journalEntry.elements.title.value,
      Image: $journalEntry.elements.PhotoURL.value,
      Notes: $journalEntry.elements.notes.value,
      entryId: data.editing.entryId
    };
    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = updatedEntry;
      }
    }
  } else if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entryData);
    var entryList = renderEntry(entryData);
    $ul.prepend(entryList);
    $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  }
  viewSwap('entries');
  $journalEntry.reset();
}

var $noEntries = document.querySelector('.no-entries');

// event listener to append all entries to html
window.addEventListener('DOMContentLoaded', function () {
  viewSwap(data.view);
  if (data.entries.length > 0) {
    $noEntries.className = 'column-full row no-entries hidden';
    for (var i = 0; i < data.entries.length; i++) {
      var $entry = renderEntry(data.entries[i]);
      $ul.appendChild($entry);
    }
  } else {
    $noEntries.className = 'column-full row no-entries';
  }
});

function viewSwap(dataView) {
  data.view = dataView;
  if (dataView === 'entry-form') {
    $entryForm.className = 'container';
    $viewEntry.className = 'container hidden';
  } else if (dataView === 'entries') {
    $entryForm.className = 'container hidden';
    $viewEntry.className = 'container';
  }
}

// DOM tree to generate entry

function renderEntry(data) {
  var $listEntry = document.createElement('li');
  $listEntry.setAttribute('data-entry-id', data.entryId);

  var $contentWrap = document.createElement('div');
  $contentWrap.setAttribute('class', 'img-title-notes row');
  $listEntry.appendChild($contentWrap);

  var $imageWrap = document.createElement('div');
  $imageWrap.setAttribute('class', 'column-half');
  $contentWrap.appendChild($imageWrap);

  var $imageEntry = document.createElement('img');
  $imageEntry.setAttribute('src', data.Image);
  $imageWrap.appendChild($imageEntry);

  var $textContent = document.createElement('div');
  $textContent.setAttribute('class', 'title-notes column-half text-padding');
  $contentWrap.appendChild($textContent);

  var $titleContainer = document.createElement('div');
  $titleContainer.setAttribute('class', 'title-notes text-padding row align-baseline justify-space-between');
  $textContent.appendChild($titleContainer);

  var $textTitle = document.createElement('h3');
  $textTitle.textContent = data.Title;
  $titleContainer.appendChild($textTitle);

  var $textDescription = document.createElement('p');
  $textDescription.textContent = data.Notes;
  $textContent.appendChild($textDescription);

  var $editEntry = document.createElement('i');
  $editEntry.setAttribute('class', 'fa-solid fa-pen edit-btn');
  $titleContainer.appendChild($editEntry);

  return $listEntry;
}

// toggle viewing and saving forms

var $newBtn = document.querySelector('.new-tag');
var $entryForm = document.querySelector('div[data-view="entry-form"]');
var $viewEntry = document.querySelector('div[data-view="entries"]');
$newBtn.addEventListener('click', function () {
  $entryForm.className = 'container';
  $viewEntry.className = 'container hidden';
  data.view = 'entry-form';
});

var $navBtn = document.querySelector('.nav-item');
$navBtn.addEventListener('click', function () {
  $entryForm.className = 'container hidden';
  $viewEntry.className = 'container';
  data.view = 'entries';
});

// edit entry functionality

$ul.addEventListener('click', function (event) { // event listener on parent of entries
  if (event.target.tagName !== 'I') { // checks if event target is not I element
    return; // if not I element, returns from funtion
  }
  viewSwap('entry-form'); // I element is click, swaps to entry form
  var editId = event.target.closest('li').getAttribute('data-entry-id'); // event target is I, gets the data-entry-id from closet li element,which is corresponding parent
  editId = parseInt(editId); // parses data-entry-id into value that can be compared
  for (let i = 0; i < data.entries.length; i++) { // loops through list of entries in data object
    if (editId === data.entries[i].entryId) { // checks if data-entry-id of li is equal to id in the data.entries object
      data.editing = data.entries[i]; // if matches, assigns it to editing property in data object
    }
  }
  $journalEntry.elements.title.value = data.editing.Title; // reassigns value of Title key in data object to value in the $journalEntry
  $journalEntry.elements.PhotoURL.value = data.editing.Image;
  $image.src = data.editing.Image;
  $journalEntry.elements.notes.value = data.editing.Notes;
});
