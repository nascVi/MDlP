import { h, render } from 'preact'
import Editor from './editor'

let editors = document.querySelectorAll('[data-mdeditor]')

editors.forEach(function(editor) {
	let $textarea = editor.querySelector('textarea')
	let value = $textarea.value
	let name = $textarea.getAttribute('name')
	editor.innerHTML = ''
	render(<Editor value={value} name={name}/>, editor, editor.firstChild)
})
