
var setter = require('setter-method')
var template = require('./template')
var domify = require('domify')
var cos = Math.cos
var sin = Math.sin

module.exports = Progress

/**
 * Progress class
 */

function Progress(){
	this.el = domify(template)
	this.pth = this.el.childNodes[1]
	this.txt = this.el.lastChild
}

/**
 * add config methods
 */

setter(Progress.prototype, 'text', '%d')
setter(Progress.prototype, 'from', 0)

/**
 * Set the size of the circle. The default is 100px
 *
 * @param {Number} n
 * @return {this}
 */

Progress.prototype.size = function(n){
	this._radius = n/2
	this._seg = ['a' + n/2, n/2, 0, 0, 1, ''].join()
	this._size = n
	return this
}

Progress.prototype.size(100)

/**
 * update the display to show `n` percent completion
 *
 * @param {Number} n
 * @return {this}
 */

Progress.prototype.update = function(n){
	// draw arc
	var style = getComputedStyle(this.el)
	var box = this.el.parentNode.getBoundingClientRect()
	var x = box.width/2
	var y = box.height/2
	var d = 'M' + (x + this._size/2) + ' ' + y
	this.pth.setAttribute('d', d + this.frame((n/100) * 360))

	// update text
	this.txt.textContent = this._text.replace('%d', n | 0)
	var tbox = this.txt.getBoundingClientRect()
	this.txt.setAttribute('x', x - tbox.width/2)
	this.txt.setAttribute('y', y + tbox.height*.296) // TODO: cross font
	return this
}

/**
 * Define the arc at point `to`
 *
 * @param {Number} to
 * @return {String}
 * @api private
 */

Progress.prototype.frame = function(to){
	var a = radians(this._from)
	var to = radians(to)
	var radius = this._radius
	var ax = cos(a) * radius
	var ay = sin(a) * radius
	var spacing = (to - a) / 4
	var out = ''
	while (a < to) {
		var b = a += spacing
		var bx = cos(b) * radius
		var by = sin(b) * radius
		out += this._seg + (bx - ax) + ',' +  (by - ay)
		ax = bx
		ay = by
	}
	return out
}

function radians(degress){
	return degress * (Math.PI / 180)
}
