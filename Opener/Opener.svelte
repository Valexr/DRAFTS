<script context="module">
	const list = new Set();
</script>

<script>
	import {slide} from 'svelte/transition'

	export let opened = false, toggled = true, group = 'opener'

	$: init(group);

	function init() {
		const fn = { [group]: () => (opened = false) }[group];
		list.add(fn);
		return () => list.delete(fn)
	}
	
	function closeAll(){
		list.forEach((fn) => fn.name === group && fn());
	};
	
	function toggle(){
		if(opened) return opened = false;
		closeAll();
		opened = true;
	}

	function open() {
		opened = !opened
	}
</script>

<button on:click={toggled ? toggle : open}>
	{ opened ? 'Close' : 'Open in ' + group }
</button>

{#if opened}
	<h1 transition:slide>Opened TRUE</h1>
{/if}