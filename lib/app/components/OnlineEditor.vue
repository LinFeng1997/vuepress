<template>
  <div class="vuepress-editor">
    <div class="mde">
      <textarea/>
    </div>
    <component class="preview" v-if="componentName" :is="componentName"></component>
  </div>
</template>

<script>
import { writeMarkdown, initMarkdownFile } from '../../api/index'
import Vue from 'vue'
// import SimpleMDE from 'simplemde'
export default {
  data () {
    return {
      value: '',
      componentName: null
    }
  },
  methods: {
    async write (e) {
      console.log('aaa')
      const content = e.target.value
      await writeMarkdown(content)
    }
  },
  async mounted () {
    const SimpleMDE = window.SimpleMDE || (() => {
    })
    // const simplemde = new SimpleMDE({ element: document.getElementById('mde') })
    this.value = await initMarkdownFile()
    const mde = new SimpleMDE()
    mde.value(this.value)
    mde.codemirror.on('change', async () => {
      await writeMarkdown(mde.value())
    })

    let OnlineMarkdown = await import('../.temp/online.md')
    OnlineMarkdown = OnlineMarkdown.default

    const componentName = 'TempMarkdown'
    Vue.component(componentName, OnlineMarkdown)
    this.componentName = componentName
  }
}
</script>
<style lang="stylus">
  .vuepress-editor
    display flex
    .mde
      width 50%
      .CodeMirror,.CodeMirror-scroll
        max-height 800px
    .preview
      width 50%
      max-height 800px
      overflow auto

  /*覆盖 vuepress 样式*/
  .CodeMirror pre {
    background-color initial !important
    line-height 1 !important
    margin: 0 !important
    padding: 0 4px !important
    overflow: visible !important
  }

</style>
