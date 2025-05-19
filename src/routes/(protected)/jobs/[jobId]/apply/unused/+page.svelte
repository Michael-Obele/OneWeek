<script>
	import IconAttach from '$lib/assets/icons/IconAttach.svelte'

	let paymentType = $state()

	$inspect(paymentType)
</script>

<div class="mx-auto mt-20 max-w-6xl px-4">
	<div class="grid grid-cols-1 gap-2 md:grid-cols-4 md:px-20">
		<div class="col-span-3 border-r-gray-600 md:border-r">
			<h1 class="mb-4 text-2xl font-bold md:mb-0 md:pl-4">Submit a Proposal</h1>
			<div class="mt-10 border-y border-gray-600 py-10 pr-10 md:pl-4">
				<div>
					<h2 class="mb-4 text-lg font-bold">Job details</h2>
					<h3 class="my-4 text-lg font-bold">Seniod UI UX Designer</h3>
					<p class="mb-4 text-gray-500">Posted Yesterday</p>
				</div>
				<div class="pl-1">
					<h2>Job Overview</h2>
					<p>
						Our furniture company is looking for a talented and creative professional to design 2
						landing pages for our website. This project has an urgent timeline of two weeks, with
						the potential for a longer-term collaboration for ongoing work.
					</p>
					<p class="mt-4">
						We are seeking someone who can expertly balance the technical aspects of conversion
						optimization with a strong sense of aesthetic design, creating landing pages that not
						only perform well but also look great.
					</p>

					<h2 class="mt-4">Budget</h2>
					<p>
						Our budget for this project is $400–$600. Applicants must confirm they can work within
						this range before applying.
					</p>

					<h2 class="mt-4">Deadline</h2>
					<p>Work must be delivered within 2 weeks of hiring.</p>

					<h2 class="mt-4">Key Responsibilities</h2>
					<ul>
						<li>Design and develop 2 high-quality landing pages optimized for conversions.</li>
						<li>Implement design elements that align with Urban Woodcraft’s brand aesthetic.</li>
						<li>Ensure landing pages are mobile-friendly and load quickly.</li>
						<li>
							Apply technical knowledge to maximize performance, including SEO optimization, page
							speed, and responsiveness.
						</li>
						<li>Incorporate data-driven insights to ensure high conversion rates.</li>
					</ul>

					<h2 class="mt-4">Required Skills and Experience</h2>
					<ul>
						<li>
							Proven experience designing high-performing landing pages (please provide portfolio
							examples).
						</li>
						<li>Expertise in tools like Webflow, WordPress, Elementor, or similar platforms.</li>
						<li>
							Strong understanding of user experience (UX) and conversion rate optimization (CRO).
						</li>
						<li>Experience working in the furniture or home decor space is a plus.</li>
						<li>Excellent attention to detail and ability to deliver within tight deadlines.</li>
					</ul>

					<h2 class="mt-4">Application Requirements</h2>
					<p>To apply for this job, please:</p>
					<ul>
						<li>
							Include the code <strong>LAND2025</strong> in your application; otherwise, it will not
							be reviewed.
						</li>
						<li>
							Provide examples of relevant past work, especially in the furniture or home decor
							industry.
						</li>
						<li>
							Confirm your ability to deliver within the two-week timeframe and budget of $400–$600.
						</li>
					</ul>

					<h2 class="mt-4">Why Work With Us?</h2>
					<p>
						We are a growing brand passionate about stylish, sustainable furniture design. This
						project offers an exciting opportunity to work with a company that values creativity,
						quality, and innovation. Impress us with your work on this project, and there's
						potential for an ongoing partnership!
					</p>
				</div>
			</div>
		</div>
		<div class="col-span-1 p-4">
			<div class="mt-10">
				<div class="mt-8 grid gap-4">
					<div>
						<div>Icon - Expert</div>
						<div>Experience level</div>
					</div>
					<div>
						<div>Icon - $20.00 - $30.00</div>
						<div>Hourly range</div>
					</div>
					<div>
						<div>Icon - More than 30 hrs/week</div>
						<div>Hourly</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-span-3">
			<div class="py-8">
				<h2 class="text-xl font-bold md:pl-4">Terms</h2>

				<fieldset class="md:pl-4">
					<legend class="text-lg font-bold">How do you want to be paid?</legend>

					<div class="flex items-center gap-3">
						<input
							bind:group={paymentType}
							value="byMilestone"
							type="radio"
							class="radio-primary radio"
							id="byMilestone"
							name="paymentType" />
						<label for="byMilestone"
							><div>By Milestone</div>
							<p class="text-sm text-gray-400">
								Divide the project into smaller segments, called milestones. You'll be paid for
								milestones as they are completed and approved.
							</p></label>
					</div>

					<div class="flex items-center gap-3">
						<input
							bind:group={paymentType}
							value="byProject"
							type="radio"
							class="radio-primary radio"
							id="byProject"
							name="paymentType" />
						<label for="byProject"
							><div>By Project</div>
							<p class="text-sm text-gray-400">
								Get your entire payment at the end when all work has been delivered.
							</p></label>
					</div>
				</fieldset>

				<div class="mt-5 border-b border-gray-600 pb-6">
					{#if paymentType == 'byMilestone'}<p class="text-lg font-bold md:pl-4">
							How many milestones do you want to include?
						</p>
						<div class="mt-2 grid grid-cols-11 justify-center gap-4 md:pl-4">
							<div class="col-span-1 flex items-center justify-center">NUMBER</div>
							<input
								class="input input-bordered col-span-4"
								type="text"
								placeholder="Enter Description" />
							<input class="input input-bordered col-span-3" type="text" placeholder="Due Date" />
							<input class="input input-bordered col-span-2" type="text" placeholder="Price" />
						</div>

						<button class="text-primary underline md:pl-4">+Add Milestone</button>{/if}
				</div>

				<div class="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 md:pl-4">
					<!--- s --->

					<div>
						<p class="text-lg font-bold">
							{#if paymentType == 'byMilestone'}Total price of project
							{:else if paymentType == 'byProject'}What is the full amount you'd like to bid for
								this job?
							{/if}
						</p>
						<p class=" text-gray-500">
							{#if paymentType == 'byMilestone'}This includes all milestones, and is the amount your
								client will see
							{:else if paymentType == 'byProject'}Total amount the client will see on your proposal
							{/if}
						</p>
					</div>
					<div>
						<label class=" flex items-end">
							<input
								type="text"
								placeholder="$/hr"
								class="input input-bordered block w-full text-center"
								value="$600.00" />
						</label>
					</div>
					<div class="col-span-full border-gray-600 md:border-b"></div>
					<!--- e --->
					<!--- s --->

					<div class="flex items-center">
						<p class=" text-gray-500">10% Freelancer Service Fee</p>
					</div>
					<div>
						<label class="my-2 flex items-center">
							<input
								type="text"
								placeholder="$/hr"
								class="input block w-full text-center"
								value="-$60.00"
								readonly />
						</label>
					</div>
					<div class="col-span-full border-gray-600 md:border-b"></div>

					<!--- e --->
					<!--- s --->

					<div class="">
						<p class="text-lg font-bold">You'll receive</p>
						<p class=" text-gray-500">The estimated amount you'll receive after service fees</p>
					</div>
					<div>
						<label class="my-2 flex items-end">
							<input
								type="text"
								placeholder="$/hr"
								class="input input-bordered block w-full text-center"
								value="$540.00" />
						</label>
					</div>

					<!--- e --->
				</div>
				<div class="col-span-full mt-4 border-b border-gray-600"></div>
			</div>
		</div>

		<div class="col-span-3">
			<div class="my-2 md:pl-4">
				<label>
					<p class="">How long will this project take?</p>
					<select
						class="select w-full max-w-xs border border-gray-600 bg-black font-sans text-white focus:outline-hidden md:text-base"
						required>
						<option value="" disabled selected>Select a duration</option>
						<option value="one">One</option>
						<option value="two">Two</option>
						<option value="three">Three</option>
					</select>
				</label>
			</div>

			<div class="my-8 md:pl-4">
				<label class="">
					<p class="py-2">Cover Letter</p>
					<textarea
						class="min-h-30 max-h-[60vh] w-full border border-gray-600 bg-transparent p-2 text-xl focus:outline-hidden"
						rows="30"
						maxlength="50000"
						placeholder="Add a message here"></textarea>
				</label>
			</div>
			<!-- This section is for adding attachments to the proposal. The label is "Attachments", and it is
				followed by a paragraph explaining that the attachments should be work samples that strengthen the
				proposal. The paragraph also mentions that the attachments should not include contact details, as
				sharing those before a contract is against the platform's policy.

				The section also includes a button labeled "Attach File", which allows the user to select up to
				10 files to attach to the proposal. The button is styled as a primary button, with a blue border
				and white text. The attached files are limited to 25MB each.

				The section is separated from the rest of the proposal form by a horizontal line, and is indented on
				large screens. -->
			<div class="my-8 md:pl-4">
				<div>Attachments</div>
				<p class="mb-4 text-gray-500">
					Add work samples to strengthen your proposal Please remove any contoct details. as sharing
					these before a contract is against our policy
				</p>
				<label class="btn border border-cyan-600 text-cyan-600">
					<IconAttach />
					Attach File

					<input multiple type="file" class="hidden" />
				</label>
				<p class="my-4 text-gray-500">Up to 10 files (max 25MB each)</p>
			</div>
			<div class="my-8 md:pl-4">
				<button class="btn bg-cyan-500 px-6 text-black">Send Proposal</button>
				<button class="btn border border-gray-100 px-6">Cancel</button>
			</div>
		</div>
	</div>
</div>
