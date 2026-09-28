<template>
  <div id="app">
    <main class="container">
      <section class="card">
        <QuizHeader
          :num-correct="numCorrect"
          :num-total="numTotal"
        />
        <QuestionBox
          v-if="questions[index]"
          :current-question="questions[index]"
          :next="next"
          :increment="increment"
        />
      </section>
    </main>
  </div>
</template>

<script>
import QuizHeader from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'

export default {
  name: 'App',
  components: {
    QuizHeader,
    QuestionBox,
  },
  data() {
    return {
      questions: [],
      index: 0,
      numCorrect: 0,
      numTotal: 0,
    }
  },
  mounted() {
    fetch('https://opentdb.com/api.php?amount=10&category=18', {
      method: 'get',
    })
      .then((response) => response.json())
      .then((jsonData) => {
        this.questions = jsonData.results
      })
  },
  methods: {
    next() {
      this.index++
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect++
      }
      this.numTotal++
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
