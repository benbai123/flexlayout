flexlayout.Flexchildren = zk.$extends(zul.Widget, {
	_flex: 0,
	// ordinal at least 1
	_ordinal: 1,
	_needRestore: false,
	$define: {
		flex: [
			function (f) {
				return f;
			}, 
			function (f) {
				this.parent.updateFlexMatrix();
			}	
		],
		ordinal: [
			function (o) {
				return o;
			}, 
			function (o) {
				this.parent.updateOrdinalMatrix();
			}	
		]
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-flexchildren";
	},
	bind_: function () {
		this.$supers(flexlayout.Flexchildren, 'bind_', arguments);
		if (!this._children) {
			this._children = [];
		}
	},
	unbind_: function () {
		this.$supers(flexlayout.Flexchildren, 'unbind_', arguments);
	},
	getPrefix: function () {
		var prefix;
		if ($.browser.mozilla)
			prefix = "-moz-";
		else if ($.browser.webkit)
			prefix = "-webkit-";
		return prefix;
	},
	/**
	 * firefox got wrong size with hflex/vflex, this fragment is try remove children before change orient,
	 * and restore them after changed then fire onSize to children,
	 * but the result is
	 * firefox got correct size before onsize fired,
	 * but got wrong size after it.*/
	removeChildren: function () {
		var c = this._children;
		for (var w = this.firstChild; w; w = w.nextSibling) {
			c.push(w);
			this.removeChild(w);
		}
		this._needRestore = true;
	},
	restoreChildren: function () {
		var c = this._children;
		for (var i = 0;i < c.length;i ++) {
			this.appendChild(c[i]);
			zWatch.fire('onSize', c[i]);
			//setTimeout(function () {zWatch.fire('onSize', c[i]);}, 2000);
		}
		c.length = 0;
	}/**/
});