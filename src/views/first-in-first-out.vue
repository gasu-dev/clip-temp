<template lang="pug">
#contents
  .list(v-if="firstInFirstOut.length > 0")
    template(
      v-for="(text, index) in firstInFirstOut"
    )
      .text(
        @click.right="showFirstInFirstOutMenu(index)"
      )
        span.new-line(
          v-for='textPerLine in text.split(/\\r?\\n/)'
        ) {{ textPerLine }}
  .text(v-else)
    template(v-if="i18n")
      | {{ i18n.get('firstInFirstOut.empty') }}
</template>

<script lang="ts">
import { defineComponent, nextTick, Ref, ref, onMounted } from 'vue';
import Internationalization from '~/internationalization';

export default defineComponent({
  setup() {
    const bindState = (firstInFirstOUt: string[]) => {
      firstInFirstOut.value = firstInFirstOUt;
      nextTick(resizeAndReposition);
    };
    const { deliverFirstInFirstOut, getFirstInFirstOut } = window.api;
    deliverFirstInFirstOut(bindState);
    getFirstInFirstOut().then(bindState);

    // data
    const firstInFirstOut = ref<string[]>([]);
    const i18n: Ref<Internationalization | undefined> = ref();
    const asyncData = async () => {
      i18n.value = await Internationalization.factory();
      await nextTick(resizeAndReposition);
    };
    asyncData();

    // methods
    const { showFirstInFirstOutMenu, resizeAndRepositionSubWindow } =
      window.api;
    const resizeAndReposition = () => {
      resizeAndRepositionSubWindow(
        Math.floor(document.body.scrollHeight * window.devicePixelRatio)
      );
    };

    // lifecycle
    const {
      getFirstInFirstOutRepeat,
      toggleFirstInFirstOutRepeat,
      closeSubWindow,
    } = window.api;
    onMounted(() => {
      const repeat = document.body.querySelector('#title-bar .repeat');
      getFirstInFirstOutRepeat().then((isRepeat: boolean) => {
        if (isRepeat && !repeat?.classList.contains('on')) {
          repeat?.classList.add('on');
        }
      });
      repeat?.addEventListener('click', () => {
        repeat.classList.toggle('on');
        toggleFirstInFirstOutRepeat();
      });
      const close = document.body.querySelector('#close');
      close?.addEventListener('click', closeSubWindow);
      resizeAndReposition();
    });

    return {
      // date
      firstInFirstOut,
      i18n,
      // methods
      showFirstInFirstOutMenu,
    };
  },
});
</script>

<style lang="scss">
@import '../assets/css/colors';
@import '../assets/css/scrollbar';

* {
  box-sizing: border-box;
}
body {
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#contents {
  padding: 0.25rem;
  font-size: 0.75rem;
  .list {
    max-height: calc(7.5rem - 4px);
    overflow-y: auto;
    border: 1px solid;
    &::-webkit-scrollbar-track {
      margin-bottom: 0;
    }
    .text {
      min-height: 1rem;
      padding: 0.25rem;
      overflow: hidden;
      font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
      white-space: pre;
      &:not(:last-child) {
        border-bottom: 1px solid;
      }
      .new-line:not(:first-child) {
        position: relative;
        padding-left: 1.25rem;
        &::before {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          font-size: 1.25rem;
          content: '⮠';
        }
      }
    }
  }
  .text {
    padding: calc(0.25rem + 1px);
  }
}

@media (prefers-color-scheme: light) {
  #contents {
    background-color: $light-background;
    .list {
      border-color: $light-border;
      .text {
        background-color: $light-background-main;
        &:first-child {
          background-color: $light-selected;
        }
        &:not(:last-child) {
          border-color: $light-border;
        }
      }
    }
    .text {
      color: $light-font;
    }
  }
}
@media (prefers-color-scheme: dark) {
  #contents {
    background-color: $dark-background;
    .list {
      border-color: $dark-border;
      .text {
        background-color: $dark-background-main;
        &:first-child {
          background-color: $dark-selected;
        }
        &:not(:last-child) {
          border-color: $dark-border;
        }
      }
    }
    .text {
      color: $dark-font;
    }
  }
}
</style>
