<script lang="ts">
	// Define the tab interface
	interface CustomTab {
		title: string
		count?: number
	}

	// Allow for both array tabs and custom tabs
	var {
		tabs = [],
		selectedTabTitle,
		customTabs = [],
		onTabChange = (tabTitle: string) => {}
	} = $props<{
		tabs?: string[]
		selectedTabTitle: string
		customTabs?: CustomTab[]
		onTabChange?: (tabTitle: string) => void
	}>()

	// Function to handle tab click
	function handleTabClick(tabTitle: string) {
		selectedTabTitle = tabTitle
		onTabChange(tabTitle)
	}
</script>

{#if tabs.length > 0}
	{#each tabs as tabTitle}
		<button
			role="tab"
			class:text-primary={selectedTabTitle === tabTitle}
			class:border-primary={selectedTabTitle === tabTitle}
			onclick={() => handleTabClick(tabTitle)}
			class="border-dove-gray text-dove-gray w-fit min-w-32 cursor-pointer border px-3 py-1 text-center text-sm capitalize hover:border-white hover:text-white"
			>{tabTitle}</button>
	{/each}
{/if}

{#if customTabs.length > 0}
	{#each customTabs as tab}
		<button
			role="tab"
			class:text-primary={selectedTabTitle === tab.title}
			class:border-primary={selectedTabTitle === tab.title}
			onclick={() => handleTabClick(tab.title)}
			class="border-dove-gray text-dove-gray w-fit min-w-32 cursor-pointer border px-3 py-1 text-center text-sm capitalize hover:border-white hover:text-white"
			>{tab.title}
			{#if tab.count !== undefined}
				({tab.count}){/if}</button>
	{/each}
{/if}
