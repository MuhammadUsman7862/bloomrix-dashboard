// ---------- 1. SIDEBAR (phones) ----------
var sidebar = document.getElementById('sidebar');
var overlay = document.getElementById('overlay');
var menuBtn = document.getElementById('menu-btn');

function setMenu(open) {
  sidebar.classList.toggle('sidebar--open', open);
  overlay.classList.toggle('overlay--show', open);
  menuBtn.setAttribute('aria-expanded', open);
}
menuBtn.addEventListener('click', function () { setMenu(!sidebar.classList.contains('sidebar--open')); });
overlay.addEventListener('click', function () { setMenu(false); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

// ---------- 2. FILTERS ----------
var search = document.getElementById('f-search');
var statusSelect = document.getElementById('f-status');

function filterRows() {
  var text = search.value.toLowerCase();
  var status = statusSelect.value;
  var rows = document.querySelectorAll('#orders tr');
  var shown = 0;
  for (var i = 0; i < rows.length; i++) {
    var okText = rows[i].textContent.toLowerCase().indexOf(text) !== -1;
    var okStatus = status === 'all' || rows[i].dataset.status === status;
    rows[i].hidden = !(okText && okStatus);
    if (okText && okStatus) shown++;
  }
  document.getElementById('empty').hidden = shown > 0;
  document.getElementById('count').textContent = 'Showing ' + shown + ' of ' + rows.length + ' orders';
}
search.addEventListener('input', filterRows);
statusSelect.addEventListener('change', filterRows);
filterRows();

// ---------- 3. MODAL + FORM ----------
var modal = document.getElementById('modal');
var form = document.getElementById('order-form');
var saveBtn = document.getElementById('save');

document.getElementById('open-modal').addEventListener('click', function () { modal.showModal(); });
document.getElementById('cancel').addEventListener('click', function () { modal.close(); });

// show or clear an error under a field
function setError(fieldId, msgId, message) {
  document.getElementById(fieldId).classList.toggle('field--error', message !== '');
  document.getElementById(msgId).textContent = message ? '\u26A0 ' + message : '';
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('o-name').value.trim();
  var amount = parseFloat(document.getElementById('o-amount').value);

  var nameError = name.length < 2 ? 'Enter a name (2+ letters).' : '';
  var amountError = !(amount > 0) ? 'Enter an amount above 0.' : '';
  setError('name-field', 'name-msg', nameError);
  setError('amount-field', 'amount-msg', amountError);
  if (nameError || amountError) return;                 // stop if there is an error

  // LOADING state (simulated save, 1 second)
  saveBtn.disabled = true;
  saveBtn.classList.add('btn--loading');
  saveBtn.textContent = 'Saving';

  setTimeout(function () {
    var body = document.getElementById('orders');
    var tr = document.createElement('tr');
    tr.className = 'table__row';
    tr.dataset.status = 'pending';
    var cells = ['#' + (1001 + body.children.length), name, '$' + amount.toFixed(2)];
    for (var i = 0; i < cells.length; i++) {
      var td = document.createElement('td');
      td.className = 'table__cell';
      td.textContent = cells[i];                        // textContent = safe
      tr.appendChild(td);
    }
    var badgeCell = document.createElement('td');
    badgeCell.className = 'table__cell';
    badgeCell.innerHTML = '<span class="badge badge--pending">Pending</span>';
    tr.appendChild(badgeCell);
    body.appendChild(tr);

    form.reset();
    saveBtn.disabled = false;
    saveBtn.classList.remove('btn--loading');
    saveBtn.textContent = 'Save order';
    modal.close();
    filterRows();
  }, 1000);
});
