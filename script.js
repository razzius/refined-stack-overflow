const $myProfile = document.querySelector('.my-profile')
const { href: myHref } = $myProfile

function isOwnAnswer ($answerNode) {
  const $answerUserLink = $answerNode.querySelector('.user-details a')
  return $answerUserLink?.href === myHref
}

function isNodeUpvoted ($answerNode) {
  const $upvoteButton = $answerNode.querySelector('.js-vote-up-btn')
  return $upvoteButton.getAttribute('aria-pressed') === 'true'
}

function sortAnswerNodes (nodes) {
  return [...nodes].sort((a, b) => {
    if (isOwnAnswer(a)) {
      return -1
    }

    if (isOwnAnswer(b)) {
      return 1
    }

    if (isNodeUpvoted(a)) {
      return -1
    }

    if (isNodeUpvoted(b)) {
      return 1
    }

    return 0
  })
}

function main () {
  sortMyAnswersAndUpvotesToTop()
  highlightMyAnswers()
  highlightMyUpvotes()
}

function highlightMyAnswers () {
  const $answersContainer = document.querySelector('#answers')
  const $answerNodes = $answersContainer.querySelectorAll('.answer')
  for (const $answer of $answerNodes) {
    if (isOwnAnswer($answer)) {
      $answer.classList.add('my-answer')
      document.body.classList.add('question-has-my-answer')
      $answer.scrollIntoView({block: "end"})
    }
  }
}

function highlightMyUpvotes () {
  const $answersContainer = document.querySelector('#answers')
  const $answerNodes = $answersContainer.querySelectorAll('.answer')
  for (const $answer of $answerNodes) {
    if (isNodeUpvoted($answer)) {
      $answer.classList.add('my-upvote')
      document.body.classList.add('question-has-my-answer')
      $answer.scrollIntoView({block: "end"})
    }
  }
}

function removeNodeList($nodes) {
  $nodes.forEach($e => $e.remove())
}

function insertElementsAfter($referenceNode, $elements) {
  const $fragment = document.createDocumentFragment()
  $fragment.append(...$elements)
  const $parent = $referenceNode.parentElement
  $parent.insertBefore($fragment, $referenceNode.nextSibling)
}

function lastNode($nodes) {
  return $nodes[$nodes.length - 1]
}

function sortMyAnswersAndUpvotesToTop () {
  const $answersContainer = document.querySelector('#answers')
  const $answerNodes = $answersContainer.querySelectorAll('.answer')
  if ($answerNodes.length === 0) {
    return
  }

  // const $elementBeforeAnswers = $answerNodes[0].previousElementSibling

  const $sortedAnswers = sortAnswerNodes($answerNodes)
  const $elementAfterAnswers = lastNode($sortedAnswers).nextElementSibling
  $sortedAnswers.forEach($e => $answersContainer.insertBefore($e, $elementAfterAnswers))
  
  // removeNodeList($answerNodes)
  // insertElementsAfter($elementBeforeAnswers, $sortedAnswers)
}

main()
