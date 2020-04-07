<template>
    <b-card-header header-tag="nav">
        <b-nav card-header tabs>
            <b-nav-item active disabled><b>Fancy Quiz App</b></b-nav-item>
            <b-nav-item disabled>Counter: {{ numCorrect }}/{{ numTotal }}</b-nav-item>
        </b-nav>
    </b-card-header>
</template>

<script>
    export default {
        props: [
            'numCorrect',
            'numTotal'
        ]
    }
</script>