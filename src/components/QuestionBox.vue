<template>
  <div class="card-body text-center">
    <p class="card-text">
      {{ decodeHtml(currentQuestion.question) }}
    </p>
    <hr class="my-4">
    <div class="row justify-content-md-center">
      <div class="col-6">
        <div class="list-group mb-3">
          <button
            v-for="(answer, index) in shuffledAnswers"
            :key="index"
            type="button"
            class="list-group-item list-group-item-action"
            :class="answerClass(index)"
            @click="selectAnswer(index)"
          >
            {{ decodeHtml(answer) }}
          </button>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-sm btn-primary me-1"
      :disabled="selectedIndex === null || answered"
      @click="submitAnswer"
    >
      Submit
    </button>
    <button
      type="button"
      class="btn btn-sm btn-success"
      @click="next"
    >
      Next
    </button>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    currentQuestion: { type: Object, required: true },
    next: { type: Function, required: true },
    increment: { type: Function, required: true },
  },
  data() {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false,
    }
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null
        this.answered = false
        this.shuffleAnswers()
      },
    },
  },
  methods: {
    selectAnswer(index) {
      this.selectedIndex = index
    },
    submitAnswer() {
      this.increment(this.selectedIndex === this.correctIndex)
      this.answered = true
    },
    shuffleAnswers() {
      const answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ]
      this.shuffledAnswers = _.shuffle(answers)
      this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
    },
    answerClass(index) {
      if (!this.answered && this.selectedIndex === index) return 'selected'
      if (this.answered && this.correctIndex === index) return 'correct'
      if (this.answered && this.selectedIndex === index && this.correctIndex !== index) {
        return 'incorrect'
      }
      return ''
    },
    decodeHtml(value) {
      return new DOMParser().parseFromString(value, 'text/html').documentElement.textContent || ''
    },
  },
}
</script>

<style scoped>
.selected {
  background-color: lightblue;
}
.correct {
  background-color: lightgreen;
}
.incorrect {
  background-color: red;
}
</style>
