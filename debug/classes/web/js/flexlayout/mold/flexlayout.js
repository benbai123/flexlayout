function (out) {
	var zcls = this.getZclass(),
		dir = this.getDirection(),
		pl = this.getParentLayout();
	out.push('<div', this.domAttrs_(), '>',
			'<div id="',this.uuid, '-cave"', 'class="',zcls,'-inner');
	if (dir) {
		out.push(' ',zcls,'-dir-');
		if (dir != 'inherit')
			out.push(this.getDirection());
		else {
			if (pl)
				out.push(pl.getDirection());
			else
				out.push('normal');
		}
	}
	out.push('">');
	
	for (var w = this.firstChild; w; w = w.nextSibling) {
		if (w.$instanceof(flexlayout.Flexlayout)) {
			w.setParentLayout(this);
		}
		w.redraw(out);
	}
	out.push('</div>',
		'</div>');
}