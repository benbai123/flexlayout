/**
 * @author whkuo
 */
flexlayout.Flexlayout = zk.$extends(zul.Widget, {
	_direction: 'normal',
	_pack: 'center',
	_orient: 'horizontal', // not work on FF 3.6
	_align: 'center',
	_rerendered: false, // for opera
	$define: {
		/** Sets the direction.
		 * note: direction=reverse on firefox will also reverse the position of blank space
		 * @param String direction
		 */
		/** Returns the direction (never null).
		 * <p>Default: "normal".
		 * @return String
		 */
		direction: [function (d) {
			var od  = this._direction;
			this.updateProperty('-dir-', 'direction', od, d);
			return d;
		}],
		/** Sets the pack.
		 * @param String pack
		 */
		/** Returns the pack (never null).
		 * <p>Default: "center".
		 * @return String
		 */
		pack: [function (p) {
			var op = this._pack;
			this.updateProperty('-pak-', 'pack', op, p);
			return p;
		}],
		/** Sets the orient.
		 * @param String orient
		 */
		/** Returns the orient (never null).
		 * <p>Default: "horizontal".
		 * @return String
		 */
		orient: [function (o) {
			var oo = this._orient;
			/**
			 * firefox got wrong size with hflex/vflex, this fragment is try remove children before change orient,
			 * and restore them after changed then fire onSize to children,
			 * but firefox got correct size before onsize fired,
			 * and got wrong size after it.*
			for (var w = this.firstChild; w; w = w.nextSibling)
				w.removeChildren();
				/**/
			this.updateProperty('-ore-', 'orient', oo, o);
			this.firedownOnSize();
			/**
			 * 
			 * see above fragment *
			for (var w = this.firstChild; w; w = w.nextSibling) {
				w.restoreChildren();
			}
			/**/
			return o;
		}],
		/** Sets the align.
		 * @param String align
		 */
		/** Returns the align (never null).
		 * <p>Default: "center".
		 * @return String
		 */
		align: [function (a) {
			var oa = this._align;
			for (var w = this.firstChild; w; w = w.nextSibling){
				// chrome got wrong size if there are children under flexchildren
				// ie8 got wrong size if previous align is stretch and
				// there are children under flexchildren
				if (zk.safari || (zk.ie8 && oa=='stretch')) {
					w.removeChildren();
				}
			}
			this.updateProperty('-alg-', 'align', oa, a);
			
			return a;
		}, function (a) {
			// add children back as need
			for (var w = this.firstChild; w; w = w.nextSibling) {
				if (w._needRestore)
					w.restoreChildren();
			}
			// ff and opera with hflex/vflex components in flexchildren have to rerender
			// or it will not re-align properly
			// so not firedown onSize here
			if (!(zk.ff || zk.opera || zk.ie9))
				this.firedownOnSize();
			else
				this.rerender();
		}]
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
		this.$supers(flexlayout.Flexlayout, 'bind_', arguments);
		this.SUPPORT = Flexie.flexboxSupported;
		this.fixSupport_();
	},
	unbind_: function () {
		this._box = this.SUPPORT = null;

		this.$supers(flexlayout.Flexlayout, 'unbind_', arguments);
	},
	firedownOnSize: function () {
		for (var w = this.firstChild; w; w = w.nextSibling) {
			for (var m = w.firstChild; m; m = m.nextSibling)
				zWatch.fire('onSize', m)
		}
	},
	fixSupport_: function() {
		var target = this.$n('cave');
		if (target) {
			var wgt = this;
			$target = $(target);
			$target.children().andSelf().removeAttr("style").css("opacity", 0);
			$target.removeAttr("style");
			if (!this._box && (!this.SUPPORT || this.SUPPORT.partialSupport)) {
				this._box = new Flexie.box({target : target});
				this._box.target = target;
			}

			this.updateProperty('-dir-', 'direction', null, this.getDirection());
			this.updateProperty('-pak-', 'pack', null, this.getPack());
			this.updateProperty('-ore-', 'orient', null, this.getOrient());
			this.updateProperty('-alg-', 'align', null, this.getAlign());
			if (this._box)
				this.update();
			this.fixStyle();
			// fix Opera issue,
			// apply properties not work without the first rerender on opera,
			if (zk.opera && !this._rerendered) {
				this._rerendered = true;
				setTimeout(function() {wgt.rerender()}, 100);
			}
		}
	},
	updateProperty: function (type, key, oldValue, newValue) {
		var target = this.$n('cave');
		if (target) {
			var $target = $(target);
			if (oldValue)
				this.removeProperty(target, $target, type, oldValue);
			this.applyProperty(target, type, key, newValue);
		}
	},
	removeProperty: function (target, $target, type, value) {
		var cls = this.getZclass() + '-inner' + type + value;
		$target = $(target);
		$target.removeClass(cls);
		$target.children().andSelf().removeAttr("style").css("opacity", 0);
		$target.removeAttr("style");
	},
	applyProperty: function (target, type, key, value) {
		var cls = ' ' + this.getZclass() + '-inner' + type + value;
		target.className += cls;
		if (this._box) {
			this._box.target = target;
			this._box[key] = value;
			this.update();
			this.fixStyle();
		}
	},
	// issue: FF will got wrong size with children of flexchildren have hflex/vflex
	updateFlexMatrix: function () {
		if (this._box) {
			var flexMatrix = [];
			var flexClass;
			for (var w = this.firstChild; w; w = w.nextSibling) {
				if (w.$instanceof(flexlayout.Flexchildren)) {
					if (!flexClass)
						flexClass = w.getZclass()+'-for-flex';
					var v = w.getFlex();
					flexMatrix.push(v);
					// chrome got wrong size if there are children under flexchildren
					// and chrome still got wrong size if mix 0 in flex matrix,
					// ex: 0, 1, 0, 0
					// this also appear at flexie demo site,
					// however, remove children of flexchildren will make it a little bit better
					//
					// ie9 will crash if update flex matrix without remove the children under flexchildren
					// and it also got the wrong size
					if (zk.safari || zk.ie9) {
						w.removeChildren();
					}
					// opera will not return to the origional size after clear flex
					var node = w.$n(),
					$node = jq(node);
					if (v > 0) {
						if (!$node.hasClass(flexClass))
							node.className += ' '+flexClass;
					} else {
						if ($node.hasClass(flexClass))
							$node.removeClass(flexClass);
					}
				}
			}
			this._box['flexMatrix'] = flexMatrix;

			this.update();
			this.fixStyle();
			var wgt = this;
			if (zk.safari || zk.ie9) {
				// add children back
				for (var w = this.firstChild; w; w = w.nextSibling)
					w.restoreChildren();
			}
			// chrome will get wrong size if fire onsize too fast
			if (zk.safari)
				setTimeout(function () {wgt.firedownOnSize();}, 10);
			else
				this.firedownOnSize();
			if (zk.ff)
				this.rerender();
		}
	},
	updateOrdinalMatrix: function () {
		if (this._box) {
			var ordinalMatrix = [];
			for (var w = this.firstChild; w; w = w.nextSibling) {
				if (w.$instanceof(flexlayout.Flexchildren)) {
					ordinalMatrix.push(w.getOrdinal());
				}
			}
			this._box['ordinalMatrix'] = ordinalMatrix;

			this.update();
			this.fixStyle();
			var wgt = this;
			this.firedownOnSize();
		}
	},
	update: function () {
		var target = this.$n('cave'),
		$target = $(target);
		$target.children().andSelf().removeAttr("style").css("opacity", 0);
		$target.removeAttr("style");
		Flexie.updateInstance(target, this._box);
	},
	fixStyle: function () {
		// add flex style back after update
		this.addFlexStyle();
		this.addOrdinalStyle();
	},
	// FF got wrong size if there has component with hflex/vflex in flexchildren
	addFlexStyle: function () {
		var flexClass;
		for (var w = this.firstChild; w; w = w.nextSibling) {
			if (w.$instanceof(flexlayout.Flexchildren)) {
				if (!flexClass)
					flexClass = w.getZclass()+'-for-flex';
				var self = w.$n(),
					$self = jq(self),
					f = w.getFlex(),
					v = f+'';

				if (v == 0) {
					if ($self.hasClass(flexClass))
						$self.removeClass(flexClass);
				}
				$self.css('-moz-box-flex', v);
				$self.css('-webkit-box-flex', v);
				$self.css('-ms-box-flex', v);
				$self.css('box-flex', v);
			}
		}
	},
	addOrdinalStyle: function () {
		for (var w = this.firstChild; w; w = w.nextSibling) {
			if (w.$instanceof(flexlayout.Flexchildren)) {
				var self = w.$n(),
					$self = jq(self),
					o = w.getOrdinal(),
					v = o+'';
				$self.css('-moz-box-ordinal-group', v);
				$self.css('-webkit-box-ordinal-group', v);
				$self.css('-ms-box-ordinal-group', v);
				$self.css('box-ordinal-group', v);
			}
		}
	}
});