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
  data.nextEntryId++;
  data.entries.unshift(entryData);
  var entryList = renderEntry(entryData);
  $ul.prepend(entryList);
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  $journalEntry.reset();
}

var $noEntries = document.querySelector('.no-entries');

// event listener to create entry and append to html
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
  } else {
    $entryForm.className = 'container hidden';
    $viewEntry.className = 'container';
  }
}

// DOM tree to generate entry

function renderEntry(data) {
  var $listEntry = document.createElement('li');

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

  var $textTitle = document.createElement('h3');
  $textTitle.textContent = data.Title;
  $textContent.appendChild($textTitle);

  var $textDescription = document.createElement('p');
  $textDescription.textContent = data.Notes;
  $textContent.appendChild($textDescription);

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
