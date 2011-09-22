package org.zkoss.addon.flexlayout;

import org.zkoss.lang.Objects;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.UiException;
import org.zkoss.zul.impl.XulElement;

/**
 * An anchorlayout lays out a container which can resize 
 * it's children base on its width and height<br>
 * <p>Available in ZK addon.
 * 
 * <p>Default {@link #getZclass}: z-anchorlayout.
 * 
 * @author peterkuo
 * @since 5.0.7
 */
public class Flexlayout extends XulElement{

	private static final long serialVersionUID = -1342193882797042898L;

	//private String _border = "none";
	private String _orient = "horizontal"; //horizontal, vertical
	private String _align = "center"; //stretch, start, end, center
	private String _direction = "normal"; //normal, reverse
	private String _pack = "center"; //start, end, center, justify
	
	public void setOrient(String orient){
		if(orient == null)
			orient = "horizontal";
		if(!Objects.equals(_orient, orient)) {
			_orient = orient;
			smartUpdate("orient", _orient);
		}
	}
	
	public String getOrient(){
		return _orient;
	}

	public void setAlign(String align){
		if(align == null)
			align = "center";
		if(!Objects.equals(_align, align)) {
			_align = align;
			smartUpdate("align", _align);
		}
	}
	
	public String getAlign(){
		return _align;
	}

	public void setDirection(String direction){
		if (direction == null)
			direction = "normal";
		if ("inherit".equals(direction)) {
			// TODO get parent direction
		}
		if(!Objects.equals(_direction, direction)) {
			_direction = direction;
			smartUpdate("direction", _direction);
		}
	}
	
	public String getDirection(){
		return _direction;
	}

	public void setPack(String pack){
		if(pack == null)
			pack = "center";
		if(!Objects.equals(_pack, pack)) {
			_pack = pack;
			smartUpdate("pack", _pack);
		}
	}
	
	public String getPack(){
		return _pack;
	}

	public void beforeChildAdded(Component child, Component refChild) {

		super.beforeChildAdded(child, refChild);
	}
	
	public String getZclass() {
		return _zclass == null ? "z-flexlayout" : _zclass;
	}
	
	// super
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);

		render(renderer, "align", _align);
		render(renderer, "direction", _direction);
		render(renderer, "orient", _orient);
		render(renderer, "pack", _pack);
	}
	
}
