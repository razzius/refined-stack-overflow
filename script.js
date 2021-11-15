function main() {
	// highlightMyAnswers();
	sortMyAnswersAndUpvotesToTop();
}

// function highlightMyAnswers() {
// 	document.querySelectorAll('.user-details a[href="https://stackoverflow.com/users/1636613/razzi-abuissa"]')[0].style.border = '2px solid green';
// }

function sortMyAnswersAndUpvotesToTop() {
  debugger

	const $myProfile = document.querySelector('.my-profile');
	const {href: myHref} = $myProfile;

	function isOwnAnswer($answerNode) {
		const $answerUserLink = $answerNode.querySelector('.user-details a');
		return $answerUserLink.href === myHref;
	}

	function isNodeUpvoted($answerNode) {
		return Boolean($answerNode.querySelector('.fc-theme-primary'));
	}

	function sortAnswerNodes(nodes) {
		return [...nodes].slice().sort((a, b) => {
			const candidates = [a, b];
			for (const node of candidates) {
				if (isOwnAnswer(node)) {
					return node;
				}
			}

			for (const node of candidates) {
				if (isNodeUpvoted(node)) {
					return node;
				}
			}

			return a;
		// })
		}).reverse();
	}

	const $answersContainer = document.querySelector('#answers');
	const $answerNodes = $answersContainer.querySelectorAll('.answer');
	const $elementBeforeAnswers = $answerNodes[0].previousElementSibling;

	// Const chars = [...$answerNodes].map(node => ({nodeUrl: node, o: isOwnAnswer(node), u: isNodeUpvoted(node)}));

	const $sortedAnswers = sortAnswerNodes($answerNodes);
	const $newAnswersFragment = document.createDocumentFragment();

	for (const $answer of $answerNodes) {
		$answer.remove();
	}

	$newAnswersFragment.append(...$sortedAnswers);
	// $newAnswersFragment.append($sortedAnswers[0]);

	$answersContainer.insertBefore($newAnswersFragment, $elementBeforeAnswers.nextSibling);
}

main();
