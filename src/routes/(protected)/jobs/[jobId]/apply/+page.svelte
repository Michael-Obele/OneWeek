<script lang="ts">
	import { enhance } from '$app/forms'
	import IconAttach from '$lib/assets/icons/IconAttach.svelte'
	import IconExperienceLevel from '$lib/assets/icons/job-details/IconExperienceLevel.svelte'
	import IconPrice from '$lib/assets/icons/job-details/IconPrice.svelte'
	import { experienceToText, timeSince } from '$lib/utils'

	let { data } = $props()

	let paymentType = $state()
	let suggestedPrice = $state(data.jobDetails?.amount)
	let projectDuration = $state()

	console.log(data)
</script>

<div class="mx-auto mt-20 max-w-6xl px-4">
	<div class="grid grid-cols-1 gap-2 md:grid-cols-4 md:px-20">
		<div class="border-r-mine-shaft col-span-3 md:border-r">
			<h1 class="mb-4 text-2xl font-bold md:mb-0 md:pl-4">Submit a Proposal</h1>
			<div class="border-mine-shaft mt-10 border-y py-10 pr-10 md:pl-4">
				<div>
					<h2 class="mb-4 text-lg font-bold">Job details</h2>
					<h3 class="my-4 text-lg font-bold">{data.jobDetails?.title}</h3>
					<p class="mb-4 text-gray-500">
						Posted {data.jobDetails?.createdAt && timeSince(data.jobDetails?.createdAt)}
					</p>
				</div>
				<div class="pl-1">
					<h2>Job Overview</h2>
					<p>{data.jobDetails?.description}</p>
				</div>
			</div>
		</div>
		<div class="col-span-1 p-4">
			<div class="mt-10">
				<div class="mt-8 grid gap-4">
					<div>
						<div class="capitalize">
							<span><IconExperienceLevel /></span>
							{data.jobDetails?.experience}
						</div>
						<div>{experienceToText(data.jobDetails?.experience)}</div>
					</div>
					<div class="capitalize">
						<div><span><IconPrice /></span> ${data.jobDetails?.amount}</div>
						<div>{data.jobDetails?.jobType}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-span-3">
			<form method="POST" use:enhance>
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

					<div class="border-mine-shaft mt-5 border-b pb-6">
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
								{#if paymentType == 'byMilestone'}This includes all milestones, and is the amount
									your client will see
								{:else if paymentType == 'byProject'}Total amount the client will see on your
									proposal
								{/if}
							</p>
						</div>
						<div>
							<label class="input w-full text-center">
								$
								<input
									name="suggestedPrice"
									type="text"
									class="text-center"
									bind:value={suggestedPrice} />
							</label>
						</div>
						<div class="border-mine-shaft col-span-full md:border-b"></div>

						<div class="flex items-center">
							<p class=" text-gray-500">10% Freelancer Service Fee</p>
						</div>
						<div>
							<label class="input w-full border-0 text-center">
								$
								<input
									type="text"
									class="text-center"
									readonly={true}
									value="-{suggestedPrice * 0.1}" />
							</label>
						</div>
						<div class="border-mine-shaft col-span-full md:border-b"></div>

						<!--- e --->
						<!--- s --->

						<div class="">
							<p class="text-lg font-bold">You'll receive</p>
							<p class=" text-gray-500">The estimated amount you'll receive after service fees</p>
						</div>
						<div>
							<label class="input w-full text-center">
								$
								<input
									type="text"
									readonly={true}
									class="text-center"
									value={suggestedPrice - suggestedPrice * 0.1} />
							</label>
						</div>

						<!--- e --->
					</div>
					<div class="border-mine-shaft col-span-full mt-4 border-b"></div>
				</div>

				<div class="my-2 md:pl-4">
					<label>
						<!-- TODO: where should I get the value or at least a function that will generate the values from client suggested timing -->
						<p class="">How long will this project take?</p>
						<select
							name="projectDuration"
							class="select border-mine-shaft w-full max-w-xs border bg-black font-sans text-white focus:outline-hidden md:text-base"
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
							name="coverLetter"
							class="border-mine-shaft max-h-[60vh] min-h-30 w-full border bg-transparent p-2 text-xl focus:outline-hidden"
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
						Add work samples to strengthen your proposal Please remove any contoct details. as
						sharing these before a contract is against our policy
					</p>
					<button class="btn btn-outline">
						<IconAttach />
						Attach File
						<input multiple type="file" class="hidden" />
					</button>
					<p class="my-4 text-gray-500">Up to 10 files (max 25MB each)</p>
				</div>
				<div class="my-8 md:pl-4">
					<button type="submit" class="btn btn-primary">Send Proposal</button>
					<button class="btn btn-outline">Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>
