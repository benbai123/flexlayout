Flexlayout is a layout component based on CSS3 Flexible Box Layout Module for the purpose of layout components.
It support cross-browser by wrapping flexie– the Cross-browser support for the CSS3 Flexible Box Model library created by doctyper on github.

Since CSS3 Flexible Box Layout is a specification under development by the W3C CSS working group and seems not done yet,
there is no guarantee for identical appearance and still has some browser issue.

## Demo
http://content.screencast.com/users/benbai123/folders/Default/media/e88aca91-16b5-4544-9f22-05af4c025256/flexlayout_demo.swf

## Example

<flexlayout width="350px" height="300px">
	<flexchildren>
		<label value="Child - 1" />
	</flexchildren>
	<flexchildren>
		<label value="Child - 2" />
	</flexchildren>
	<flexchildren>
		<label value="Child - 3" />
	</flexchildren>
	<flexchildren>
		<label value="Child - 4" />
	</flexchildren>
</flexlayout>

## Properties

### flexlayout
	*	**orient**
		(optional) The box-orient of this Flexlayout.
		Possible values: `horizontal`, `vertical`
		Default: `horizontal`
	*	**align**
		(optional) The box-align of this Flexlayout.
		Possible values: `stretch`, `start`, `end`, `center`
		Default: `center`
	*	**direction**
		(optional) The box-direction of this Flexlayout.
		Possible values: `normal`, `reverse`
		Default: `normal`
	*	**pack**
		(optional) The box-pack of this Flexlayout.
		Possible values: `start`, `end`, `center`, `justify`
		Default: `center`

### flexchildren
	*	**flex**
		(optional) The box-flex value of this Flexchildren.
		Possible values: int >= 0
		Default: 0
	*	**ordinal**
		(optional) The ordinal-group number of this Flexchildren.
		Possible values: int >= 1
		Default: 1