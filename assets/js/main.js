setInterval(countdownWedding, 1000);

function countdownWedding() {
  var c = moment("2017-02-11 17:00:00").countdown();
  document.getElementById('months').innerText = c.months;
  document.getElementById('days').innerText = c.days;
  document.getElementById('hours').innerText = c.hours;
  document.getElementById('minutes').innerText = c.minutes;
  document.getElementById('seconds').innerText = c.seconds;
}

countdownWedding();

$('.slider').slick({
  lazyLoad: 'ondemand',
  dots: true,
  accessibility: false,
  adaptiveHeight: true
});

$form = $('#invites-form');

$form.on('submit', function(e) {
  e.preventDefault();

  var fieldsMapper = {
    name: 'entry.475859828',
    email: 'entry.761133885',
    'invited-adult': 'entry.1958632898',
    'invited-10-5': 'entry.1266517159',
    'invited-5': 'entry.502841350',
    'message': 'entry.1695859073'
  };

  var fields = {
    name: $('[name="name"]').val(),
    email: $('[name="email"]').val(),
    'invited-adult': $('[name="invited-adult"]').val(),
    'invited-10-5': $('[name="invited-10-5"]').val(),
    'invited-5': $('[name="invited-5"]').val(),
    'message': $('[name="message"]').val()
  };

  var check = true;
  for(var key in fields) {
    if(!check) return;
    if(!fields[key]) {
      alert('Por favor, preencha todos os campos');
      check = false;
    }
  }

  if(!check) return;

  submitGoogleForm(fields, fieldsMapper, 'google-form');

  $('.submit-container').html('<img src="assets/images/loader.gif" />');
  setTimeout(function() {
    $form.html('<div class="thanks">Obrigado por confirmar sua presença</div>')
  }, 4000);
});

function submitGoogleForm(fields, mapper, googleFormId) {
  var formData = Object.keys(mapper).reduce(function(data, key) {
    data[mapper[key]] = fields[key];
    return data;
  }, {});

  var googleForm = document.getElementById(googleFormId);
  if (googleForm === null) {
    throw new Error('You must have an embedded iframe with your Google Form');
  }

  var form = document.createElement('form');
  form.action = googleForm.src.replace('viewform', 'formResponse');
  form.method = 'POST';
  form.target = googleFormId;
  form.style = 'display: none';

  Object.keys(formData).forEach(function(key) {
    var field = document.createElement('input');
    field.name = key;
    field.value = formData[key];
    form.appendChild(field);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
