<template>
  <p>copy</p>
</template>

<script>
export default {
  name: 'Copy',
  props: {
  },
  data() {
    return {
      aa:'ssss',
      aa1:'ssss',
      aa2:'ssss',
      aa3:'ssss',
      aa4:'ssss',
      aa5:'ssss',
      aa6:'ssss',
      aa7:'ssss',
      aa8:'ssss',
      aa9:'ssss',
      aa0:'ssss',
    }
  },
  mounted() {
    console.log('this',this);
    console.log('copy');
  },
  beforeRouteEnter (to, from, next){
    console.log('beforeRouteEnter');
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate');
    next()
  },
  
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave');
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
