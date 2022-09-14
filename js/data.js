/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var dataJSON = localStorage.getItem('journal-entry-storage');
if (dataJSON !== null) {
  data = JSON.parse(dataJSON);
}

window.addEventListener('beforeunload', function () {
  var entries = JSON.stringify(data);
  localStorage.setItem('journal-entry-storage', entries);
}
);
