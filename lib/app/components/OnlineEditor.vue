<template>
  <div>
    <textarea rows="10" :value="value" @input="write"/>
    <component v-if="componentName" :is="componentName"></component>
  </div>
</template>

<script>
import { writeMarkdown, initMarkdownFile } from '../../api/index'
import Vue from 'vue'
export default {
  data () {
    return {
      value: '',
      componentName: null
    }
  },
  methods: {
    async write (e) {
      const content = e.target.value
      await writeMarkdown(content)
    }
  },
  async mounted () {
    this.value = await initMarkdownFile()
    console.log(this.value)

    let OnlineMarkdown = await import('../.temp/online.md')
    OnlineMarkdown = OnlineMarkdown.default

    const componentName = 'TempMarkdown'
    Vue.component(componentName, OnlineMarkdown)
    this.componentName = componentName
  }
}
</script>
<style>
  textarea {
    width: 100%;
  }
</style>
