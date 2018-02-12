import {h} from 'preact'
import Button from './Button'

export default class ItalicButton extends Button {
	
	shortcut = 'Ctrl-I'

	icon () {
		return <svg aria-hidden="true" class="octicon octicon-italic" width="24" height="24" version="1.1" viewBox="0 0 6 16">
	<path fill-rule="evenodd" d="M2.81 5h1.98L3 14H1l1.81-9zm.36-2.7c0-.7.58-1.3 1.33-1.3.56 0 1.13.38 1.13 1.03
	0 .75-.59 1.3-1.33 1.3-.58 0-1.13-.38-1.13-1.03z">
	</path>
	</svg>
	}

	action (editor) {
		editor.getDoc().replaceSelection('*' + editor.getDoc().getSelection() + '*')
			editor.focus()
	}

}