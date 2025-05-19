<script>
	import IconAttach from '$lib/assets/icons/IconAttach.svelte'
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
			<div class=" py-8 md:pl-4">
				<h2 class="text-lg font-bold">Terms</h2>
				<div class="text-lg font-bold">What is the rate you'd like to bid for this job?</div>
				<p class="mb-4 text-gray-500">Your profile rate: $20/hr</p>
				<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
					<!--- s --->

					<div>
						<p class="text-lg font-bold">Hourly Rate</p>
						<p class=" text-gray-500">Total amount the client will see on your proposal</p>
					</div>
					<div>
						<label class=" flex items-end">
							<input
								type="text"
								placeholder="$/hr"
								class="input input-bordered block w-full text-center"
								value="$20.00" />
							<!---->
							<span class="whitespace-nowrap">/hr</span>
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
								value="-$2.00/hr"
								readonly />
							<!---->
							<span class="whitespace-nowrap">/hr</span>
						</label>
					</div>
					<div class="col-span-full border-gray-600 md:border-b"></div>

					<!--- e --->
					<!--- s --->

					<div class="">
						<p class="text-lg font-bold">You'll recive</p>
						<p class=" text-gray-500">The estimated amount you'll recive after service fees</p>
					</div>
					<div>
						<label class="my-2 flex items-end">
							<input
								type="text"
								placeholder="$/hr"
								class="input input-bordered block w-full text-center"
								value="$18.00" />
							<!---->
							<span class="whitespace-nowrap">/hr</span>
						</label>
					</div>

					<!--- e --->
				</div>
			</div>
			<div class="col-span-full border-b border-gray-600"></div>
		</div>

		<div class="col-span-3 mt-6 md:pl-4">
			<h2 class="text-lg font-bold">Schedule a reate increase</h2>
			<p class="mb-4 text-gray-500">
				Propose an optional rate increase If approved by your client. rare Will increase
				automatically over contracfs lifetime This term can't be changed orce you accept an offer
				from your client
			</p>
			<div class="my-2">
				<label>
					<p class="">How often do you want a rate increase?</p>
					<select
						class="select w-full max-w-xs border border-gray-600 bg-black font-sans text-white focus:outline-hidden md:text-base"
						required>
						<option value="" disabled selected>Select a frequency</option>
						<option value="one">One</option>
						<option value="two">Two</option>
						<option value="three">Three</option>
					</select>
				</label>
			</div>
			<div class="my-2">
				<label>
					<p class="">How often do you want a rate increase?</p>
					<select
						class="select w-full max-w-xs border border-gray-600 bg-black font-sans text-white focus:outline-hidden md:text-base"
						required>
						<option value="" disabled selected>Select a frequency</option>
						<option value="one">One</option>
						<option value="two">Two</option>
						<option value="three">Three</option>
					</select>
				</label>
			</div>

			<div class="my-8">
				<label class="">
					<p class="py-2">Cover Letter</p>
					<textarea
						class="min-h-30 max-h-[60vh] w-full border border-gray-600 bg-transparent p-2 text-xl focus:outline-hidden"
						rows="30"
						maxlength="50000"
						placeholder="Add a message here"></textarea>
				</label>
			</div>
			<div class="my-8">
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
			<div class="my-8">
				<button class="btn bg-cyan-500 px-6 text-black">Send Proposal</button>
				<button class="btn border border-gray-100 px-6">Cancel</button>
			</div>
		</div>
	</div>
</div>
