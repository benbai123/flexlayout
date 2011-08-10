/**
 * @author whkuo
 */
flexlayout.Flexlayout = zk.$extends(zul.Widget, {
	$define: {
		direction: null
	},
	getParentLayout: function () {
		return this._parentLayout;
	},
	setParentLayout: function (pl) {
		this._parentLayout = pl;
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-flexlayout";
	},
	
	bind_: function () {//after compose
	},
	unbind_: function () {
	}
});