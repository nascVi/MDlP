import {h, Component} from 'preact'
import linkstate from 'linkstate'
import CodeMirror from './CodeMirror'
import Markdown from './Markdown'
import './style'
import { Bold, Italic, Speech, Fullscreen }from './buttons'

export default class Editor extends Component {

	constructor (props) {
		super(props)
		this.state = {
			content: props.value,
			editor: null,
			fullscreen: false
		}
	}


	render ({name}, {content, editor, fullscreen}) {
		let cls = 'mdeditor'
		if (fullscreen === true) {
			cls += ' mdeditor--fullscreen'
		}
		return <div class={cls}>
			<div class="mdeditor__toolbar">
				<div class="mdeditor__toolbarleft">
					{editor && [
						<Bold editor={editor}/>,
						<Italic editor={editor}/>,
						<Speech editor={editor}/>,
					]}
				</div>
				<div class="mdeditor__toolbarright">
					{editor && [
						<Fullscreen editor={editor} onFullscreen={linkstate(this, 'fullscreen')} fullscreen={fullscreen}/>,
					]}
				</div>
			</div>
			<div class="mdeditor__editor">
				<CodeMirror name={name} value={content} onReady={this.setEditor}/>
			</div>
			<div class="mdeditor__preview">
				<Markdown markdown={content}/>
			</div>
			<textarea name={name} style="display:none;">{content}</textarea>
		</div>
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState.fullscreen !== this.state.fullscreen && this.state.editor) {
			this.state.editor.refresh()
		}
	}

	setEditor = (editor) => {
		this.setState({editor})
		editor.on('change', e => {
		this.setState({content: e.getDoc().getValue()})
		})
	}

}