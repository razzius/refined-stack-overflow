const $myProfile = document.querySelector('.my-profile');
const {href: myHref} = $myProfile;

function isOwnAnswer($answerNode) {
	const $answerUserLink = $answerNode.querySelector('.user-details a');
	return $answerUserLink?.href === myHref;
}

function isNodeUpvoted($answerNode) {
	return Boolean($answerNode.querySelector('.fc-theme-primary'));
}

function sortAnswerNodes(nodes) {
	return [...nodes].sort((a, b) => {
		if (isOwnAnswer(a)) {
			return -1;
		}

		if (isOwnAnswer(b)) {
			return 1;
		}

		if (isNodeUpvoted(a)) {
			return -1;
		}

		if (isNodeUpvoted(b)) {
			return 1;
		}

		return 0;
	});
}

function main() {
	sortMyAnswersAndUpvotesToTop();
	highlightMyAnswers();
	highlightMyUpvotes();
}

function highlightMyAnswers() {
	const $answersContainer = document.querySelector('#answers');
	const $answerNodes = $answersContainer.querySelectorAll('.answer');
	for (const $answer of $answerNodes) {
		if (isOwnAnswer($answer)) {
			$answer.style.border = '2px solid #44d';
			document.body.classList.add('my-answer');
                  $answer.scrollIntoView(false)
		}
	}
}
function highlightMyUpvotes() {
	const $answersContainer = document.querySelector('#answers');
	const $answerNodes = $answersContainer.querySelectorAll('.answer');
	for (const $answer of $answerNodes) {
		if (isNodeUpvoted($answer)) {
			$answer.style.border = '2px solid #44d';
			document.body.classList.add('my-answer');
                  $answer.scrollIntoView(false)
		}
	}
}


function sortMyAnswersAndUpvotesToTop() {
	const $answersContainer = document.querySelector('#answers');
	const $answerNodes = $answersContainer.querySelectorAll('.answer');
	const $elementBeforeAnswers = $answerNodes[0].previousElementSibling;


	const $sortedAnswers = sortAnswerNodes($answerNodes);
	const chars = [...$sortedAnswers].map(node => ({nodeUrl: node.querySelectorAll('.user-details a'), o: isOwnAnswer(node), u: isNodeUpvoted(node)}));
	console.log(chars);
	const $newAnswersFragment = document.createDocumentFragment();

	for (const $answer of $answerNodes) {
		$answer.remove();
	}

	$newAnswersFragment.append(...$sortedAnswers);

	$answersContainer.insertBefore($newAnswersFragment, $elementBeforeAnswers.nextSibling);
}

main();
