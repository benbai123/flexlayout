flexlayout.Flexchildren = zk.$extends(zul.Widget, {
	$define: {
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-flexchildren";
	},
	bind_: function () {
	},
	unbind_: function () {
	}	
});