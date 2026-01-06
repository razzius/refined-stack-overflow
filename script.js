const profileLink = document.querySelector('nav .s-user-card').href

function isOwnAnswer ($answer) {
  const $answerUserLink = $answer.querySelector('.user-details a')
  return $answerUserLink?.href === profileLink
}

function isNodeUpvoted ($answer) {
  const $upvoteButton = $answer.querySelector('.js-vote-up-btn')
  return $upvoteButton.getAttribute('aria-pressed') === 'true'
}

function sortAnswerNodes ($nodes) {
  return [...$nodes].sort((a, b) => {
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
  const $answersContainer = document.querySelector('#answers')
  const $answers = $answersContainer.querySelectorAll('.answer')
  sortMyAnswersAndUpvotesToTop($answersContainer, $answers)
  highlightMyAnswers($answers)
  highlightMyUpvotes($answersContainer, $answers)
  scrollToMyAnswersAndUpvotes($answers)
}

function scrollToMyAnswersAndUpvotes ($answers) {
  sortAnswerNodes($answers).filter(
    $answer => isOwnAnswer($answer) || isNodeUpvoted($answer)).slice(0, 1)
    .forEach(
      $answer => $answer.scrollIntoView()
    )
}

function highlightMyAnswers ($answers) {
  for (const $answer of $answers) {
    if (isOwnAnswer($answer)) {
      $answer.classList.add('my-answer')
    }
  }
}

function highlightMyUpvotes ($answersContainer, $answers) {
  for (const $answer of $answers) {
    if (isNodeUpvoted($answer)) {
      $answer.classList.add('my-upvote')
    }
  }
}

function lastNode ($nodes) {
  return $nodes[$nodes.length - 1]
}

function sortMyAnswersAndUpvotesToTop ($answersContainer, $answers) {
  if ($answers.length === 0) {
    return
  }

  const $sortedAnswers = sortAnswerNodes($answers)
  const $elementAfterAnswers = lastNode($sortedAnswers).nextElementSibling
  $sortedAnswers.forEach($e => $answersContainer.insertBefore($e, $elementAfterAnswers))
}

main()
