import {h} from 'preact'
import Button from './Button'

export default class FullscreenButton extends Button {

	icon ({fullscreen}) {
		let style = fullscreen ? 'fill: #8BC34A' : null
		return <svg style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.666 16h-4.666v-4.666l1.508 1.507 1.843-1.841 1.649 1.649-1.842 1.842 1.508 1.509zm-1.315-9l-1.843-1.842-1.508 1.508v-4.666h4.666l-1.508 1.508 1.842 1.843-1.649 1.649zm16.649 9h-4.666l1.507-1.508-1.841-1.843 1.649-1.649 1.842 1.842 1.509-1.508v4.666zm0-9.334l-1.508-1.507-1.843 1.841-1.649-1.649 1.842-1.842-1.508-1.509h4.666v4.666z"/></svg>
	}

	action (editor) {
		this.props.onFullscreen(!this.props.fullscreen)
	}

}