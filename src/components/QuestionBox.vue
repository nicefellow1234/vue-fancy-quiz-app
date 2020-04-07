<template>
    <b-card-body class="text-center">
        <b-card-text v-html="currentQuestion.question"></b-card-text>
        <hr class="my-4">
        <b-row class="justify-content-md-center">
            <b-col cols="6">
                <b-list-group class="mb-3">
                    <b-list-group-item button
                        v-for="(answer, index) in shuffledAnswers"
                        :key="index"
                        @click="selectAnswer(index)"
                        v-html="answer"
                        :class="answerClass(index)"
                    >
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
        <b-button size="sm" variant="primary" class="mr-1"
                  @click="submitAnswer"
                  :disabled="selectedIndex === null || answered"
        >Submit</b-button>
        <b-button @click="next" size="sm" variant="success" @>Next</b-button>
    </b-card-body>
</template>

<script>
    import _ from 'lodash'

    export default {
        props: {
            currentQuestion: Object,
            next: Function,
            increment: Function
        },
        data() {
          return {
              selectedIndex: null,
              correctIndex: null,
              shuffledAnswers: [],
              answered: false
          }
        },
        watch: {
            currentQuestion: {
                immediate: true,
                handler() {
                    this.selectedIndex = null
                    this.answered = false
                    this.shuffleAnswers()
                }
            }
        },
        methods: {
          selectAnswer(index) {
              this.selectedIndex = index
          },
          submitAnswer() {
            let isCorrect = false
            if (this.selectedIndex === this.correctIndex) {
                isCorrect = true
            }
            this.increment(isCorrect)
            this.answered = true
          },
          shuffleAnswers() {
              let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
              this.shuffledAnswers = _.shuffle(answers)
              this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
          },
          answerClass(index) {
              let answerClass = ''
              if (!this.answered && this.selectedIndex === index) {
                  answerClass = 'selected'
              } else if (this.answered && this.correctIndex === index) {
                  answerClass = 'correct'
              } else if (this.answered && this.selectedIndex === index && this.correctIndex != index) {
                  answerClass = 'incorrect'
              }
              return answerClass
          }
        },
        computed: {
            answers() {
                let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
                return answers
            }
        }
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