import {h} from 'preact'
import Button from './Button'

export default class SpeechButton extends Button {

	constructor (props) {
		super(props)
		if (window.hasOwnProperty('webkitSpeechRecognition')) {
		this.recognition = new webkitSpeechRecognition()
		this.recognition.lang = 'fr-FR'
		this.recognition.continious = true
		this.recognition.interimResults = false
		}
	}

	render (props, state) {
		global.editor = props.editor
		return window.hasOwnProperty('webkitSpeechRecognition') ? super.render(props, state) : null
	}
	
	icon (props, {listening}) {
		let style = null
		if (listening) {
			style = 'fill: #FF0000'
		}

		return <svg style={style} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M7.5 21c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm9 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-4.5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm8-12v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-4 2c0 2.209-1.791 4-4 4s-4-1.791-4-4v-7c0-2.209 1.791-4 4-4s4 1.791 4 4v7z"/></svg>
	}

	action (editor) {
		if (this.state.listening === true) {
			this.recognition.stop()
			this.setState({listening: false})
		} else {
			this.recognition.start()
			this.setState({listening: true})
			this.recognition.onresult = (e) => {
				let result = e.results.item(e.resultIndex)
				if(result.isFinal === true) {
					let transcript = result.item(0).transcript
					if (this.shouldCapitalize()) {
						transcript = this.capitalize(transcript)
					}
					editor.getDoc().replaceSelection(transcript)
				}
			}
			editor.focus()
		}
	}

	shouldCapitalize () {
		let cursor = this.props.editor.getCursor()
		let startSentence = this.props.editor.getDoc().getRange({
			line: cursor.line,
			ch: 0
		}, cursor).trim().endsWith('.')
		if (cursor.ch === 0 || startSentence) {
			return true
		}
	}

	capitalize (s) {
		return s.charAt(0).toUpperCase() + s.slice(1)
	}

}