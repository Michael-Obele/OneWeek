<script lang="ts">
	import { page } from '$app/state'
	import IconCheckmark from '$lib/assets/icons/IconCheckmark.svelte'
	import IconDownArrow from '$lib/assets/icons/IconDownArrow.svelte'
	import IconEnterArrow from '$lib/assets/icons/IconEnterArrow.svelte'
	import IconLogo from '$lib/assets/icons/IconLogo.svelte'
	import IconPlus from '$lib/assets/icons/IconPlus.svelte'
	import IconRightArrow from '$lib/assets/icons/IconRightArrow.svelte'
	import IconUpArrow from '$lib/assets/icons/IconUpArrow.svelte'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { categories } from '$lib/stores/globalStore'

	const steps = [
		{ number: 1, title: 'Project Title', active: true },
		{ number: 2, title: 'Categories', active: false },
		{ number: 3, title: 'Description', active: false },
		{ number: 4, title: 'Scope', active: false },
		// { number: 5, title: 'Milestone list', active: false },
		{ number: 5, title: 'Candidate Questions', active: false },
		{ number: 6, title: 'Review', active: false }
	]

	let currentStep = $state(1)
	let projectTitle = $state('')
	let projectDescription = $state('')
	let selectedCategory: null | number = $state(null)
	let selectedSubcategory: null | number = $state(null)
	let textarea: HTMLTextAreaElement

	function isCurrentStepValid() {
		switch (currentStep) {
			case 1:
				return projectTitle.trim().length >= 3
			case 2:
				return selectedCategory !== null && selectedSubcategory !== null
			case 3:
				return projectDescription.trim().length >= 50
			case 4:
				return budget > 0 && duration && experience
			case 5:
				return questions.some((q) => q.text.trim().length > 0)
			case 6:
				return true
			default:
				return false
		}
	}

	const isStepActive = $derived((stepNumber: number) => stepNumber <= currentStep)
	const isCurrentStep = $derived((stepNumber: number) => stepNumber === currentStep)

	let budgetType = $state('fixed')
	let budget = $state(500)
	let duration = $state('')
	let experience = $state('')

	let jobId = $state<string | null>(page.url.searchParams.get('jobId'))

	async function handleNext() {
		if (currentStep === 2 && selectedCategory !== null && selectedSubcategory !== null && !jobId) {
			const selectedSubcategoryObj =
				$categories[selectedCategory].subcategories[selectedSubcategory]
			const formData = new FormData()
			formData.append('title', projectTitle)
			formData.append('categoryId', selectedSubcategoryObj._id)
			const response: any = await fetch('?/create-draft-job', {
				method: 'POST',
				body: formData
			})
			const result = await response.json()
			// The data is a JSON string that needs to be parsed
			const parsedData = JSON.parse(result.data)
			// Extract the jobId from the second element in the array
			jobId = parsedData[1]
			goto(`?jobId=${jobId}`, { replaceState: true })
		} else if (currentStep >= 3 && jobId) {
			const formData = new FormData()
			formData.append('jobId', jobId)

			if (currentStep === 3) {
				formData.append('description', projectDescription)
			} else if (currentStep === 4) {
				formData.append('budgetType', budgetType)
				formData.append('budget', budget.toString())
				formData.append('duration', duration)
				formData.append('experience', experience)
			} else if (currentStep === 5) {
				formData.append('questions', JSON.stringify(questions))
			} else if (currentStep === 6) {
				formData.append('status', 'open')
			}

			await fetch('?/update-job', {
				method: 'POST',
				body: formData
			})

			// If this was the final step, navigate to dashboard
			if (currentStep === 6) {
				goto('/dashboard')
				return
			}
		}

		if (currentStep < steps.length) {
			currentStep++
			const nextStep = document.getElementById(`step${currentStep}`)
			nextStep?.scrollIntoView({ behavior: 'smooth' })
		}
	}

	function handlePrevious() {
		if (currentStep > 1) {
			currentStep--
			const prevStep = document.getElementById(`step${currentStep}`)
			prevStep?.scrollIntoView({ behavior: 'smooth' })
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		const key = event.key.toUpperCase()

		// Handle Enter key for navigation
		if (event.key === 'Enter' && isCurrentStepValid()) {
			// Prevent navigation if description textarea is focused
			if (currentStep === 3 && document.activeElement === textarea) {
				return
			}
			handleNext()
			return
		}

		// Handle letter keys for categories only in step 2
		if (currentStep === 2 && /^[A-L]$/.test(key)) {
			const index = $categories.findIndex((cat: any) => cat.key === key)
			if (index !== -1) {
				selectCategory(index)
			}
		}

		// Handle letter keys for duration only in step 4
		if (currentStep === 4 && /^[A-D]$/.test(key)) {
			switch (key) {
				case 'A':
					handleDurationChange('6monthsPlus')
					break
				case 'B':
					handleDurationChange('3to6Months')
					break
				case 'C':
					handleDurationChange('1to3Months')
					break
				case 'D':
					handleDurationChange('lessThan1Month')
					break
			}
		}

		// Handle number keys for experience level only in step 4
		if (currentStep === 4 && /^[1-3]$/.test(key)) {
			switch (key) {
				case '1':
					handleExperienceChange('easy')
					break
				case '2':
					handleExperienceChange('intermediate')
					break
				case '3':
					handleExperienceChange('expert')
					break
			}
		}
	}

	function selectCategory(index: number) {
		selectedCategory = index
		selectedSubcategory = null
	}

	function selectSubcategory(index: number) {
		selectedSubcategory = index
	}

	function handleBudgetTypeChange(type: string) {
		budgetType = type
	}

	function handleDurationChange(newDuration: string) {
		duration = newDuration
	}

	function handleExperienceChange(newExperience: string) {
		experience = newExperience
	}

	function formatBudget(value: number) {
		const numericValue = value.toString().replace(/[^\d]/g, '')
		return numericValue ? `$${numericValue}` : '$0'
	}

	onMount(() => {
		// Ensure first step is visible on mount
		const firstStep = document.getElementById('step1')
		if (firstStep) {
			firstStep.scrollIntoView({ behavior: 'smooth' })
		}

		// Add global keyboard event listener
		window.addEventListener('keydown', handleKeydown)

		// Prevent backspace from navigating back
		const preventBackspaceNavigation = (e: KeyboardEvent) => {
			if (
				e.key === 'Backspace' &&
				!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
			) {
				e.preventDefault()
			}
		}
		window.addEventListener('keydown', preventBackspaceNavigation)

		// Return cleanup function
		return () => {
			window.removeEventListener('keydown', handleKeydown)
			window.removeEventListener('keydown', preventBackspaceNavigation)
		}
	})

	function adjustTextareaHeight() {
		if (!textarea) return
		textarea.style.height = 'auto'
		textarea.style.height = Math.min(textarea.scrollHeight, window.innerHeight * 0.5) + 'px'
	}

	// Milestone state
	// type Milestone = {
	// 	description: string
	// 	price: number
	// 	dueDate: string
	// }
	// let milestones = $state<Milestone[]>([{ description: '', price: 0, dueDate: '' }])

	// function addMilestone() {
	// 	milestones = [...milestones, { description: '', price: 0, dueDate: '' }]
	// }

	// function updateMilestone(index: number, field: keyof Milestone, value: string | number) {
	// 	milestones = milestones.map((milestone, i) =>
	// 		i === index ? { ...milestone, [field]: value } : milestone
	// 	)
	// }

	// function removeMilestone(index: number) {
	// 	if (milestones.length > 1) {
	// 		milestones = milestones.filter((_, i) => i !== index)
	// 	}
	// }

	// Candidate questions state
	type Question = {
		text: string
	}
	let questions = $state<Question[]>([{ text: '' }])

	function addQuestion() {
		questions = [...questions, { text: '' }]
	}

	function updateQuestion(index: number, value: string) {
		questions = questions.map((question, i) =>
			i === index ? { ...question, text: value } : question
		)
	}

	function removeQuestion(index: number) {
		if (questions.length > 1) {
			questions = questions.filter((_, i) => i !== index)
		}
	}
</script>

<!-- Header with steps -->
<header class="bg-black p-7">
	<div class="container flex items-center">
		<a class="btn btn-ghost mr-8" href={page.data.user?.userId ? '/dashboard' : '/landing'}>
			<IconLogo />
		</a>
		<nav class="hidden w-full max-w-7xl items-center justify-between md:flex">
			{#each steps as step, index}
				<div class="flex items-center">
					<div class="relative flex min-w-fit items-center">
						<span
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-base font-medium transition-all {isCurrentStep(
								step.number
							)
								? 'border-primary bg-primary text-black'
								: isStepActive(step.number)
									? 'border-primary text-white'
									: 'border-gray-500 text-gray-500'}">
							{step.number}
						</span>
						<span
							class="ml-3 text-sm font-medium whitespace-nowrap {isStepActive(step.number)
								? 'text-white'
								: 'text-gray-500'}">{step.title}</span>
					</div>
					{#if index !== steps.length - 1}
						<div class="mx-8 w-12">
							<div
								class="h-[2px] w-full {isStepActive(steps[index + 1].number)
									? 'from-primary bg-linear-to-r to-gray-500'
									: 'bg-gray-500'}">
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</nav>
	</div>
</header>
<div class="flex h-[calc(100vh-8rem)] flex-col bg-black text-white">
	<!-- Main content -->
	<main class="container mx-auto flex-1 overflow-hidden">
		<div class="carousel carousel-vertical h-full w-full snap-y snap-mandatory overflow-hidden">
			<div class="carousel-item flex h-full snap-center items-center justify-center" id="step1">
				<div class="flex w-full max-w-2xl items-start gap-4">
					<span class="flex items-center justify-center gap-2 pt-1">1<IconRightArrow /></span>
					<div class="flex w-full flex-col items-start justify-center">
						<div class="mb-8">
							<h2 class="text-2xl">Let's start with a strong title</h2>
						</div>
						<div class="relative w-full">
							<input
								type="text"
								class="focus:border-primary border-dove-gray w-full border-b bg-transparent py-2 text-xl focus:outline-hidden"
								placeholder="Senior UI/UX Designer Services"
								bind:value={projectTitle}
								maxlength="100"
								onkeydown={handleKeydown} />
							<div class="text-silver-light mt-2 text-sm">
								{projectTitle.length}/100
							</div>
						</div>
						<div class="mt-24 flex items-center space-x-4">
							<button
								class="btn btn-primary px-6 py-2"
								onclick={handleNext}
								disabled={!isCurrentStepValid()}>
								OK<IconCheckmark /></button>
							<span class="flex items-center gap-2"><IconEnterArrow /> press Enter</span>
						</div>
					</div>
				</div>
			</div>
			<div
				class="carousel-item flex h-full snap-start items-start justify-center overflow-y-scroll"
				id="step2">
				<div class="flex min-h-full w-full items-center justify-center">
					<div class="flex w-full max-w-5xl items-start gap-4">
						<span class="flex items-center justify-center gap-2 pt-1">2<IconRightArrow /></span>
						<div class="flex w-full flex-col">
							<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-32">
								<!-- Categories -->
								<div class="flex flex-col gap-2">
									<div class="mb-8">
										<h2 class="text-2xl">Select the category</h2>
									</div>
									{#each $categories as category, index}
										<button
											class="border-dove-gray flex items-center gap-2 border px-4 py-2 text-left {selectedCategory ===
											index
												? 'bg-primary border-primary text-black'
												: ''}"
											onclick={() => selectCategory(index)}>
											<span class="flex h-6 w-6 items-center justify-center border border-current"
												>{category.key}</span>
											{category.categoryName}
										</button>
									{/each}
								</div>
								{#if selectedCategory !== null && $categories[selectedCategory]?.subcategories}
									<!-- Subcategories -->
									<div class="flex flex-col gap-2">
										<div class="mb-8">
											<h2 class="text-2xl">Select the subcategory</h2>
										</div>
										{#each $categories[selectedCategory].subcategories as subcategory, index}
											<button
												class="border-dove-gray flex items-center gap-2 border px-4 py-2 text-left {selectedSubcategory ===
												index
													? 'bg-primary border-primary text-black'
													: ''}"
												onclick={() => selectSubcategory(index)}>
												<span class="flex h-6 w-6 items-center justify-center border border-current"
													>{index + 1}</span>
												{subcategory.subcategoryName}
											</button>
										{/each}
									</div>
								{/if}
							</div>

							<div class="mt-4 flex items-center space-x-4">
								<button
									class="btn btn-primary px-6 py-2"
									onclick={handleNext}
									disabled={!isCurrentStepValid()}>
									OK<IconCheckmark />
								</button>
								<span class="flex items-center gap-2"><IconEnterArrow /> press Enter</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="carousel-item flex h-full snap-center items-center justify-center" id="step3">
				<div class="flex w-full max-w-2xl items-start gap-4">
					<span class="flex items-center justify-center gap-2 pt-1">3<IconRightArrow /></span>
					<div class="flex w-full flex-col items-start justify-center">
						<div class="mb-8">
							<h2 class="text-2xl">Write a description for your job post</h2>
						</div>
						<div class="relative w-full">
							<textarea
								bind:value={projectDescription}
								bind:this={textarea}
								class="focus:border-primary border-dove-gray max-h-[60vh] min-h-20 w-full border-b bg-transparent py-2 text-xl focus:outline-hidden"
								rows="5"
								maxlength="50000"
								placeholder="Seeking a Senior UI/UX Designer to lead design initiatives, create wireframes, and collaborate with development team"
								oninput={adjustTextareaHeight}
								onkeydown={handleKeydown}></textarea>
							<div class="text-silver-light mt-2 text-sm">
								{projectDescription.length}/50000
							</div>
						</div>
						<div class="mt-24 flex items-center space-x-4">
							<button
								class="btn btn-primary px-6 py-2"
								onclick={handleNext}
								disabled={!isCurrentStepValid()}>
								OK<IconCheckmark /></button>
							<span class="flex items-center gap-2"><IconEnterArrow /> press Enter</span>
						</div>
					</div>
				</div>
			</div>

			<div
				class="carousel-item flex h-full snap-start items-start justify-center overflow-y-auto"
				id="step4">
				<div class="flex min-h-full w-full items-center justify-center">
					<div class="flex w-full max-w-2xl items-start gap-4">
						<span class="flex items-center justify-center gap-2 pt-1">4<IconRightArrow /></span>
						<div class="flex w-full flex-col">
							<div class="mb-6 flex items-center gap-2">
								<h2 class="text-lg">Tell us about your budget</h2>
							</div>

							<div class="w-full space-y-4">
								<button
									class="border-dove-gray flex items-center gap-2 border px-4 py-2 text-left {budgetType ===
									'fixed'
										? 'bg-primary border-primary text-black'
										: ''}"
									onclick={() => handleBudgetTypeChange('fixed')}>
									<span class="flex h-6 w-6 items-center justify-center border border-current"
										>A</span>
									Fixed
								</button>

								<input
									type="text"
									value={formatBudget(budget)}
									class="focus:border-primary border-dove-gray grow border-b bg-transparent py-2 text-base focus:outline-hidden"
									placeholder="$1000"
									oninput={(e: any) => {
										const value = e.target.value.replace(/[^\d]/g, '')
										budget = value ? parseInt(value) : 0
										e.target.value = formatBudget(budget)
									}}
									onkeypress={(e) => {
										if (!/^\d*$/.test(e.key)) {
											e.preventDefault()
										}
									}} />

								<button
									disabled
									class="btn border-dove-gray flex items-center gap-2 border px-4 py-2 text-left {budgetType ===
									'hourly'
										? 'bg-primary border-primary text-black'
										: ''}"
									onclick={() => handleBudgetTypeChange('hourly')}>
									<span class="flex h-6 w-6 items-center justify-center border border-current"
										>B</span>
									Hourly
								</button>
								<div class="mt-6">
									<h3 class="mb-3">How long will your work take?</h3>
									<div class="space-y-2">
										<button
											class="border-dove-gray flex w-64 items-center gap-2 border px-4 py-2 text-left {duration ===
											'6monthsPlus'
												? 'bg-primary border-primary text-black'
												: ''}"
											onclick={() => handleDurationChange('6monthsPlus')}>
											<span class="flex h-6 w-6 items-center justify-center border border-current"
												>A</span>
											More than 6 Months
										</button>
										<button
											class="border-dove-gray flex w-64 items-center gap-2 border px-4 py-2 text-left {duration ===
											'3to6Months'
												? 'bg-primary border-primary text-black'
												: ''}"
											onclick={() => handleDurationChange('3to6Months')}>
											<span class="flex h-6 w-6 items-center justify-center border border-current"
												>B</span>
											3 to 6 months
										</button>
										<button
											class="border-dove-gray flex w-64 items-center gap-2 border px-4 py-2 text-left {duration ===
											'1to3Months'
												? 'bg-primary border-primary text-black'
												: ''}"
											onclick={() => handleDurationChange('1to3Months')}>
											<span class="flex h-6 w-6 items-center justify-center border border-current"
												>C</span>
											1 to 3 months
										</button>
										<button
											class="border-dove-gray flex w-64 items-center gap-2 border px-4 py-2 text-left {duration ===
											'lessThan1Month'
												? 'bg-primary border-primary text-black'
												: ''}"
											onclick={() => handleDurationChange('lessThan1Month')}>
											<span class="flex h-6 w-6 items-center justify-center border border-current"
												>D</span>
											Less than 1 month
										</button>
									</div>
								</div>

								<div class="mt-6">
									<h3 class="mb-3">What level of experience will it need?</h3>
									<div class="space-y-2">
										<button
											class="border-dove-gray flex w-64 items-center gap-2 border px-4 py-2 text-left {experience ===
											'easy'
												? 'bg-primary border-primary text-black'
												: ''}"
											onclick={() => handleExperienceChange('easy')}>
											<span class="flex h-6 w-6 items-center justify-center border border-current"
												>1</span>
											Easy
										</button>
										<button
											class="border-dove-gray flex w-64 items-center gap-2 border px-4 py-2 text-left {experience ===
											'intermediate'
												? 'bg-primary border-primary text-black'
												: ''}"
											onclick={() => handleExperienceChange('intermediate')}>
											<span class="flex h-6 w-6 items-center justify-center border border-current"
												>2</span>
											Intermediate
										</button>
										<button
											class="border-dove-gray flex w-64 items-center gap-2 border px-4 py-2 text-left {experience ===
											'expert'
												? 'bg-primary border-primary text-black'
												: ''}"
											onclick={() => handleExperienceChange('expert')}>
											<span class="flex h-6 w-6 items-center justify-center border border-current"
												>3</span>
											Expert
										</button>
									</div>
								</div>
								<div class="mt-24 flex items-center space-x-4">
									<button
										class="btn btn-primary px-6 py-2"
										onclick={handleNext}
										disabled={!isCurrentStepValid()}>
										OK<IconCheckmark />
									</button>
									<span class="flex items-center gap-2"><IconEnterArrow /> press Enter</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div
				class="carousel-item flex h-full snap-start items-start justify-center overflow-y-auto"
				id="step5">
				<div class="flex min-h-full w-full items-center justify-center">
					<div class="flex w-full max-w-2xl items-start gap-4 py-8">
						<span class="flex items-center justify-center gap-2 pt-1">5<IconRightArrow /></span>
						<div class="flex w-full flex-col">
							<h2 class="mb-6 text-lg">Contract milestones</h2>
							<div class="w-full space-y-4">
								{#each milestones as milestone, index}
									<div class="mb-4 flex w-full items-center gap-4">
										<input
											type="text"
											class="flex-1 border-b border-dove-gray bg-transparent py-2 text-base focus:border-primary focus:outline-hidden"
											placeholder="Name or Description here"
											bind:value={milestone.description}
											oninput={(e: any) =>
												updateMilestone(index, 'description', e.currentTarget.value)} />
										<input
											type="number"
											class="w-32 border-b border-dove-gray bg-transparent py-2 text-base focus:border-primary focus:outline-hidden"
											placeholder="Price"
											bind:value={milestone.price}
											oninput={(e: any) =>
												updateMilestone(index, 'price', parseFloat(e.currentTarget.value))} />
										<input
											type="date"
											class="w-40 border-b border-dove-gray bg-transparent py-2 text-base focus:border-primary focus:outline-hidden"
											placeholder="Due Date"
											bind:value={milestone.dueDate}
											oninput={(e: any) => updateMilestone(index, 'dueDate', e.currentTarget.value)} />
										{#if milestones.length > 1}
											<button
												class="text-red-500 hover:text-red-400"
												onclick={() => removeMilestone(index)}>
												×
											</button>
										{/if}
									</div>
								{/each}

								<button
									class="btn mb-8 flex items-center gap-2 border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-black"
									onclick={addMilestone}>
									<IconPlus /> Add Milestone
								</button>

								<div class="mt-auto flex items-center space-x-4">
									<button class="btn btn-primary px-6 py-2" onclick={handleNext}>
										OK<IconCheckmark />
									</button>
									<span class="flex items-center gap-2"><IconEnterArrow /> press Enter</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> -->
			<div
				class="carousel-item flex h-full snap-start items-start justify-center overflow-y-auto"
				id="step5">
				<div class="flex min-h-full w-full items-center justify-center">
					<div class="flex w-full max-w-2xl items-start gap-4">
						<span class="flex items-center justify-center gap-2 pt-1">5<IconRightArrow /></span>
						<div class="flex w-full flex-col">
							<h2 class="mb-6 text-lg">Write questions for candidate?</h2>
							<div class="w-full space-y-4">
								{#each questions as question, index}
									<div class="mb-4 flex w-full items-center gap-4">
										<input
											type="text"
											class="focus:border-primary border-dove-gray flex-1 border-b bg-transparent py-2 text-base focus:outline-hidden"
											placeholder="Enter your question here"
											bind:value={question.text}
											oninput={(e) => updateQuestion(index, e.currentTarget.value)} />
										{#if questions.length > 1}
											<button
												class="text-red-500 hover:text-red-400"
												onclick={() => removeQuestion(index)}>
												×
											</button>
										{/if}
									</div>
								{/each}

								<button
									class="btn border-primary text-primary hover:bg-primary mb-8 flex items-center gap-2 border px-4 py-2 hover:text-black"
									onclick={addQuestion}>
									<IconPlus /> Add Question
								</button>
							</div>

							<div class="mt-24 flex items-center space-x-4">
								<button
									class="btn btn-primary px-6 py-2"
									onclick={handleNext}
									disabled={!isCurrentStepValid()}>
									OK<IconCheckmark />
								</button>
								<span class="flex items-center gap-2">
									<IconEnterArrow /> press Enter
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Review Step -->
			<div
				class="carousel-item flex h-full snap-start items-start justify-center overflow-y-auto bg-black"
				id="step6">
				<div class="flex min-h-full w-full flex-col">
					<div class="mx-auto flex w-full max-w-2xl items-start px-8">
						<div class="relative mx-auto w-full max-w-2xl">
							<!-- <div class="flex justify-end py-8">
								<button class="btn bg-primary px-6 py-2 text-sm text-black hover:bg-primary/90">
									Edit
								</button>
							</div> -->

							<div class="flex w-full max-w-2xl items-start gap-4">
								<span class="flex items-center justify-center gap-2">
									6
									<IconRightArrow />
								</span>

								<div class="flex flex-1 flex-col gap-6">
									<div>
										<span class="mb-2 block">Title</span>
										<div class="bg-[#1A1A1A] p-3">{projectTitle || ''}</div>
									</div>

									<div>
										<span class="mb-2 block">Description</span>
										<div class="bg-[#1A1A1A] p-3">{projectDescription || ''}</div>
									</div>

									<div>
										<span class="mb-2 block">Category</span>
										<div class="bg-[#1A1A1A] p-3">
											{selectedCategory !== null ? $categories[selectedCategory].categoryName : ''}
										</div>
									</div>

									<div>
										<span class="mb-2 block">Subcategory</span>
										<div class="bg-[#1A1A1A] p-3">
											{#if selectedCategory !== null && selectedSubcategory !== null}
												{$categories[selectedCategory].subcategories[selectedSubcategory]
													.subcategoryName}
											{/if}
										</div>
									</div>

									<div>
										<span class="mb-2 block">Job Type</span>
										<div class="bg-[#1A1A1A] p-3">
											{budgetType === 'fixed' ? 'Fixed Rate' : 'Hourly Rate'}
										</div>
									</div>

									<div>
										<span class="mb-2 block">Amount</span>
										<div class="bg-[#1A1A1A] p-3">${budget}</div>
									</div>

									<div>
										<span class="mb-2 block">Duration</span>
										<div class="bg-[#1A1A1A] p-3">
											{#if duration === '6monthsPlus'}
												More than 6 Months
											{:else if duration === '3to6Months'}
												3 to 6 months
											{:else if duration === '1to3Months'}
												1 to 3 months
											{:else if duration === 'lessThan1Month'}
												Less than 1 month
											{/if}
										</div>
									</div>

									<div>
										<span class="mb-2 block">Experience Level</span>
										<div class="bg-[#1A1A1A] p-3">
											{#if experience === 'easy'}
												Easy
											{:else if experience === 'intermediate'}
												Intermediate
											{:else if experience === 'expert'}
												Expert
											{/if}
										</div>
									</div>

									<div>
										<span class="mb-2 block">Question for Candidate</span>
										<div class="bg-[#1A1A1A] p-3">
											{#each questions as question}
												<p>{question.text}</p>
											{/each}
										</div>
									</div>

									<div class="flex items-center gap-2">
										<button
											class="btn bg-primary hover:bg-primary/90 px-4 py-2 text-sm text-black"
											disabled={!isCurrentStepValid()}>
											OK <IconCheckmark />
										</button>
										<span class="text-silver-light flex items-center gap-2">
											<IconEnterArrow /> press Enter
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

	<!-- Navigation arrows -->
	<div class="fixed right-4 bottom-4 flex gap-3">
		<button
			class="btn btn-square btn-outline btn-secondary"
			onclick={handlePrevious}
			disabled={currentStep === 1}>
			<IconUpArrow />
		</button>
		<button
			class="btn btn-square btn-outline btn-secondary"
			onclick={handleNext}
			disabled={currentStep === steps.length || !isCurrentStepValid()}>
			<IconDownArrow />
		</button>
	</div>
</div>
