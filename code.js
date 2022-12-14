let _screen = document.getElementById('screen')

const state = {
  _screenValue: '0',
  get screenValue() {
    return this._screenValue
  },

  set screenValue(arg) {
    _screen.innerHTML = arg
    this._screenValue = arg.toString()
  },
  cachedScreenValue: '0',
  previousOperator: undefined,
  lastKeyType: 'number',
}

const doMath = (n1, n2, op) => {
  if (op === 0) return n1 + n2

  if (op === 1) return n1 - n2

  if (op === 2) return n1 * n2

  if (op === 3) return n1 / n2
}

for (let i = 0; i < 11; i++) {
  let value = i

  document.getElementById('num_' + i).onclick = function pressed() {
    value = i != 10 ? i : '.'

    if (state.screenValue.includes('.') && value == '.') {
      value = ''
    }
    if (state.lastKeyType === 'number') {
      state.screenValue =
        state.screenValue === '0'
          ? value.toString()
          : state.screenValue + value.toString()
    } else {
      if (state.previousOperator === 6) {
        state.cachedScreenValue = undefined
      } else {
        state.cachedScreenValue = state.screenValue
      }
      state.screenValue = value.toString()
    }

    state.lastKeyType = 'number'
  }
}
for (let i = 0; i < 6; i++) {
  let value = i
  document.getElementById('op_' + i).onclick = function pressed() {
    if (state.lastKeyType === 'op') {
      if (state.previousOperator === 6) {
        state.cachedScreenValue = state.screenValue
      }
    } else {
      if (state.previousOperator || state.previousOperator === 0) {
        const n1 = parseFloat(state.cachedScreenValue)
        const n2 = parseFloat(state.screenValue)
        const result = doMath(n1, n2, state.previousOperator)
        state.screenValue = result
        state.cachedScreenValue = result
      }
    }

    state.previousOperator = value
    state.lastKeyType = 'op'
  }
}
