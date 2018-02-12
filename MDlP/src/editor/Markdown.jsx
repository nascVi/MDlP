import {h, Component} from 'preact'
import marked from 'marked'

export default class Markdown extends Component {
	
	render (props) {
		return <div dangerouslySetInnerHTML={{__html: this.renderMarkdown()}}/>
	}

	renderMarkdown () {
		marked.setOptions({
		  gfm: true,
		  tables: true,
		  breaks: true,
		  pedantic: false,
		  sanitize: true,
		  smartLists: true,
		  smartypants: false
		})
		return marked(this.props.markdown)
	}


} 