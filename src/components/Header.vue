<template>
  <header class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <span class="nav-link active disabled"><strong>Fancy Quiz App</strong></span>
      </li>
      <li class="nav-item">
        <span class="nav-link disabled">Counter: {{ numCorrect }}/{{ numTotal }}</span>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'QuizHeader',
  props: {
    numCorrect: { type: Number, required: true },
    numTotal: { type: Number, required: true },
  },
}
</script>
