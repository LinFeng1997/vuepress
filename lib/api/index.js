function say (name, now) {
  if (name) {
    return '[SYNC]Hello ' + name + ',now browser time is:' + now + ',server time is:' + new Date()
  } else {
    throw Error('[SYNC ERROR]No name')
  }
}

function sayCallback (name, now, callback) {
  setTimeout(function () {
    if (name) {
      callback(null, '[CALLBACK]Hello ' + name + ',now browser time is:' + now + ',server time is:' + new Date())
    } else {
      callback('[CALLBACK ERROR]No name')
    }
  }, 1000)
}

function sayPromise (name, now) {
  return new Promise(function (resolve, reject) {
    if (name) {
      resolve('[PROMISE]Hello ' + name + ',now browser time is:' + now + ',server time is:' + new Date())
    } else {
      reject('[PROMISE ERROR]No name')
    }
  })
}

exports.say = say
exports.say_callback = sayCallback
exports.say_promise = sayPromise
