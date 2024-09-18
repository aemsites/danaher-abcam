const requiredMessage = 'This field is required';
const lengthMessage = 'Invalid length for field value';
const emailMessage = 'A valid email address is required';

function handleFormSubmit(ele) {
  const submitButton = ele.querySelector('input[type=submit]');
  const spinner = document.createElement('span');
  spinner.setAttribute('class', 'loader');
  submitButton.setAttribute('disabled', true);
  submitButton.style.cursor = 'wait';
  submitButton.parentNode.appendChild(spinner);
  return true;
}
function resetSubmitButton(e) {
  let submitButtons = e.target.form.getElementsByClassName('submit-button');
  for (var i = 0; i < submitButtons.length; i += 1) {
    submitButtons[i].disabled = false;
  }
}
function addChangeHandler(elements) {
  for (let i = 0; i < elements.length; i += 1) {
    elements[i].addEventListener('change', resetSubmitButton);
  }
}
let form = document.getElementById('form1941');
addChangeHandler(form.getElementsByTagName('input'));
addChangeHandler(form.getElementsByTagName('select'));
addChangeHandler(form.getElementsByTagName('textarea'));
var nodes = document.querySelectorAll('#form1941 input[data-subscription]');
if (nodes) {
  for (var i = 0, len = nodes.length; i < len; i += 1) {
    var status = nodes[i].dataset ? nodes[i].dataset.subscription : nodes[i].getAttribute('data-subscription');
    if (status === 'true') {
      nodes[i].checked = true;
    }
  }
}
var nodes = document.querySelectorAll('#form1941 select[data-value]');
if (nodes) {
  for (let i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];
    var selectedValue = node.dataset ? node.dataset.value : node.getAttribute('data-value');
    if (selectedValue) {
      for (let j = 0; j < node.options.length; j += 1) {
        if (node.options[j].value === selectedValue) {
          node.options[j].selected = 'selected';
          break;
        }
      }
    }
  }
}
this.getParentElement = function (list) {
  return list[list.length - 1].parentElement;
};
var dom0 = document.querySelector('#form1941 #fe31062');
var fe31062 = new LiveValidation(
  dom0,
  {
    validMessage: '',
    onlyOnBlur: false,
    wait: 300,
    isPhoneField: false,
  },
);
fe31062.add(Validate.Presence, { failureMessage: requiredMessage });
fe31062.add(
  Validate.Format,
  {
    pattern: /(^[A-Z0-9!#\$%&'\*\+\-\/=\?\^_`\{\|\}~][A-Z0-9!#\$%&'\*\+\-\/=\?\^_`\{\|\}~\.]{0,62}@(([A-Z0-9](?:[A-Z0-9\-]{0,61}[A-Z0-9])?)(\.[A-Z0-9](?:[A-Z0-9\-]{0,61}[A-Z0-9])?)+)$)/i,
    failureMessage: emailMessage,
  },
);
fe31062.add(
  Validate.Format,
  {
    pattern: /\.\.|\.@/i,
    failureMessage: emailMessage,
    negate: 'true',
  },
);
var ppv = {};
ppv['0'] = function () {
  var dom0 = document.querySelector('#form1941 #fe31047');
  var fe31047 = new LiveValidation(
    dom0,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31047.add(
    Validate.Length,
    {
      tooShortMessage: lengthMessage,
      tooLongMessage: lengthMessage,
      minimum: 0,
      maximum: 100,
    },
  );
  fe31047.add(
    Validate.Custom,
    {
      against: function (value) {
        return !value.match(/(telnet|ftp|https?):\/\/(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\.|[a-z0-9]\.)+[a-z]{2,63}/i);
      },
      failureMessage: "Value must not contain any URL's",
    },
  );
  fe31047.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['1'] = function () {
  var dom1 = document.querySelector('#form1941 #fe31048');
  var fe31048 = new LiveValidation(
    dom1,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31048.add(Validate.Presence, { failureMessage: requiredMessage });
  fe31048.add(
    Validate.Custom,
    {
      against: (value) => {
        return !value.match(/(telnet|ftp|https?):\/\/(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\.|[a-z0-9]\.)+[a-z]{2,63}/i);
      },
      failureMessage: "Value must not contain any URL's",
    },
  );
  fe31048.add(
    Validate.Length,
    {
      tooShortMessage: lengthMessage,
      tooLongMessage: lengthMessage,
      minimum: 0,
      maximum: 100,
    },
  );
};
ppv['2'] = function () {
  var dom2 = document.querySelector('#form1941 #fe31049');
  var fe31049 = new LiveValidation(
    dom2,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31049.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['3'] = function () {
  var dom3 = document.querySelector('#form1941 #fe31050');
  var fe31050 = new LiveValidation(
    dom3,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
};
ppv['4'] = function () {
  var dom4 = document.querySelector('#form1941 #fe31051');
  var fe31051 = new LiveValidation(
    dom4,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31051.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['5'] = function () {
  var dom5 = document.querySelector('#form1941 #fe31052');
  var fe31052 = new LiveValidation(
    dom5,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31052.add(
    Validate.Custom,
    {
      against: (value) => {
        return !value.match(/(telnet|ftp|https?):\/\/(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\.|[a-z0-9]\.)+[a-z]{2,63}/i);
      },
      failureMessage: "Value must not contain any URL's",
    },
  );
  fe31052.add(
    Validate.Custom,
    {
      against: (value) => {
        return !value.match(/(<([^>]+)>)/ig);
      },
      failureMessage: 'Value must not contain any HTML',
    },
  );
  fe31052.add(
    Validate.Length,
    {
      tooShortMessage: lengthMessage,
      tooLongMessage: lengthMessage,
      minimum: 0,
      maximum: 35,
    },
  );
  fe31052.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['6'] = function () {
  var dom6 = document.querySelector('#form1941 #fe31053');
  var fe31053 = new LiveValidation(
    dom6,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31053.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['7'] = function () {
  var dom7 = document.querySelector('#form1941 #fe31054');
  var fe31054 = new LiveValidation(
    dom7,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31054.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['8'] = function () {
  var dom8 = document.querySelector('#form1941 #fe31055');
  var fe31055 = new LiveValidation(
    dom8,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31055.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['9'] = function () {
  var dom9 = document.querySelector('#form1941 #fe31056');
  var fe31056 = new LiveValidation(
    dom9,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31056.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['10'] = function () {
  var dom10 = document.querySelector('#form1941 #fe31057');
  var fe31057 = new LiveValidation(
    dom10,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31057.add(
    Validate.Custom,
    {
      against: function (value) {
        return !value.match(/(telnet|ftp|https?):\/\/(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\.|[a-z0-9]\.)+[a-z]{2,63}/i);
      },
      failureMessage: "Value must not contain any URL's",
    },
  );
  fe31057.add(
    Validate.Length,
    {
      tooShortMessage: 'Invalid length for field value',
      tooLongMessage: 'Invalid length for field value',
      minimum: 0,
      maximum: 35,
    },
  );
};
ppv['11'] = function () {
  var dom11 = document.querySelector('#form1941 #fe31058');
  var fe31058 = new LiveValidation(
    dom11,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31058.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['12'] = function () {
  var dom12 = document.querySelector('#form1941 #fe31059');
  var fe31059 = new LiveValidation(
    dom12,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
  fe31059.add(Validate.Presence, { failureMessage: requiredMessage });
};
ppv['13'] = function () {
  var dom13 = document.querySelector('#form1941 #fe31060');
  var fe31060 = new LiveValidation(
    dom13,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
};
ppv['14'] = function () {
  var dom14 = document.querySelector('#form1941 #fe31061');
  var fe31061 = new LiveValidation(
    dom14,
    {
      validMessage: '',
      onlyOnBlur: false,
      wait: 300,
      isPhoneField: false,
    },
  );
};
var config = {
  formId: '1941', mode: 'list', numStages: 0, numFields: 15, numToReveal: 6, randomize: false, onlyIncomplete: true,
};
var revealed = [];
var getPreviousValue = function (elem) {
  var prev;
  if (elem.dataset) {
    prev = elem.dataset.previous;
  }
  else {
    prev = elem.getAttribute('data-previous');
  }
  return prev;
};
var showField = function (field, index) {
  field.style.display = '';
  revealed.push(index + '');
  var vf = ppv[index];
  if (vf) vf();
};
var textHasValue = function (input, field, onlyPrev) {
  var prev;
  var hasValue = false;
  if (!input.value || onlyPrev) {
    prev = getPreviousValue(input);
    if (prev) {
      input.value = prev;
      hasValue = true;
    }
  }
  else {
    hasValue = true;
  }
  return hasValue;
};
var radioHasValue = function (input, field, onlyPrev) {
  var prev, i, len;
  var hasValue = false;
  var nodes = field.querySelectorAll('input');
  if (!onlyPrev) {
    for (i = 0, len = nodes.length; i < len; i += 1) {
      if (nodes[i].checked) hasValue = true;
    }
  }
  if (!hasValue) {
    prev = getPreviousValue(input);
    for (i = 0, len = nodes.length; i < len; i += 1) {
      if (nodes[i].value && nodes[i].value === prev) {
        nodes[i].checked = true;
        hasValue = true;
      }
    }
  }
  return hasValue;
};
var checkboxHasValue = function (input, field, onlyPrev) {
  var prev, prevVals, i, len;
  var hasValue = false;
  var nodes = field.querySelectorAll('input');
  if (!onlyPrev) {
    for (i = 0, len = nodes.length; i < len; i += 1) {
      if (nodes[i].checked) hasValue = true;
    }
  }
  if (!hasValue) {
    prev = getPreviousValue(input);
    prevVals = prev.split(',');
    for (i = 0, len = nodes.length; i < len; i += 1) {
      if (nodes[i].value && prevVals.indexOf(nodes[i].value) >= 0) {
        nodes[i].checked = true;
        hasValue = true;
      }
    }
  }
  return hasValue;
};
var selectHasValue = function (input, field, onlyPrev) {
  var prev, prevVals;
  var hasValue = false;
  var nodes = input.options;
  if (!onlyPrev) {
    for (i = 0, len = nodes.length; i < len; i += 1) {
      if (nodes[i].value && nodes[i].selected) hasValue = true;
    }
  }
  if (!hasValue) {
    prev = getPreviousValue(input);
    prevVals = prev.split(',');
    for (var i = 0, len = nodes.length; i < len; i += 1) {
      if (nodes[i].value && prevVals.indexOf(nodes[i].value) >= 0) {
        nodes[i].selected = 'selected';
        hasValue = true;
      }
    }
  }
  return hasValue;
};
var fieldHasValue = function (field, onlyPrev) {
  let input;
  let textarea;
  let select;
  let hasValue;
  hasValue = false;
  input = field.querySelector('input');
  textarea = field.querySelector('textarea');
  select = field.querySelector('select');
  if (input) {
    if (input.type.indexOf('text') >= 0) {
      hasValue = textHasValue(input, field, onlyPrev);
    } else if (input.type.indexOf('radio') >= 0) {
      hasValue = radioHasValue(input, field, onlyPrev);
    } else if (input.type.indexOf('checkbox') >= 0) {
      hasValue = checkboxHasValue(input, field, onlyPrev);
    }
  } else if (textarea) {
    hasValue = textHasValue(textarea, field, onlyPrev);
  } else if (select) {
    hasValue = selectHasValue(select, field, onlyPrev);
  }
  return hasValue;
};
var groupHasPreviousValues = function (group) {
  var fields = group.querySelectorAll('.pp-field');
  for (var i = 0; i < fields.length; i += 1) {
    if (fieldHasValue(fields[i], true)) return true;
  }
  return false;
};
var showGroup = function (group, index) {
  var fields = [];
  fields = group.querySelectorAll('.pp-field');
  for (var i = 0; i < fields.length; i += 1) {
    showField(fields[i], `${index}-${i}`);
  }
};
if (config.mode === 'list') {
  var li;
  var i;
  var lookup = [];
  for (i = 0; i < config.numFields; i += 1) {
    lookup[i] = i;
  }
  if (config.randomize) {
    var x;
    var t;
    for (i = 0; i < config.numFields; i += 1) {
      x = Math.floor(Math.random() * config.numFields);
      t = lookup[i];
      lookup[i] = lookup[x];
      lookup[x] = t;
    }
  }
  for (i = 0; i < config.numFields; i += 1) {
    li = lookup[i];
    if (revealed.length === config.numToReveal) break;
    if (revealed.indexOf(li) >= 0) continue;
    pField = document.querySelector(`#form${config.formId} #epp${li}`);
    if (!fieldHasValue(pField)) showField(pField, li);
  }
  if (revealed.length < config.numToReveal) {
    for (i = 0; i < config.numFields; i += 1) {
      li = lookup[i];
      if (revealed.length === config.numToReveal) break;
      if (revealed.indexOf(li) >= 0) continue;
      pField = document.querySelector(`#form${config.formId} #epp${li}`);
      if (!fieldHasValue(pField)) showField(pField, li);
    }
  }
  if (revealed.length < config.numToReveal) {
    for (i = 0; i < config.numFields; i += 1) {
      li = lookup[i];
      if (revealed.length === config.numToReveal) break;
      if (revealed.indexOf(li) >= 0) continue;
      pField = document.querySelector(`#form${config.formId} #epp${li}`);
      if (!config.onlyIncomplete) showField(pField, li);
    }
  }
} else {
  var group;
  for (let i = 0; i < config.numStages; i += 1) {
    group = document.querySelector(`#form${config.formId}  #pps${i}`);
    if (!groupHasPreviousValues(group) || (i === (config.numStages - 1))) {
      showGroup(group, i);
      break;
    }
  }
}
